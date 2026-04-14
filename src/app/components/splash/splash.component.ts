import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeDService } from '../../services/three-d.service';
import * as THREE from 'three';

/**
 * ✅ ENHANCED Splash Component - Visual Quality Improved
 * 
 * IMPROVEMENTS:
 * 1. ✅ Robot is OPAQUE (transparent: false)
 * 2. ✅ Materials are GLOSSY with emissive glow
 * 3. ✅ Enhanced 5-light cinematic setup
 * 4. ✅ Proper color mapping (purple/pink/red neon)
 * 5. ✅ Better camera positioning
 * 6. ✅ Shadow mapping enabled
 * 7. ✅ ACES tone mapping for cinema quality
 * 8. ✅ Head follows cursor (FIXED logic)
 */
@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit, OnDestroy {
  @Output() splashComplete = new EventEmitter<void>();
  @ViewChild('splashWrapper', { static: true }) splashWrapper!: ElementRef;
  @ViewChild('splashCanvas') splashCanvas!: ElementRef<HTMLCanvasElement>;

  // UI state
  isExiting = false;
  brandingVisible = false;
  buttonVisible = false;
  isMobile = false;

  particles: any[] = [];
  private timeouts: any[] = [];

  // Three.js instances
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model!: THREE.Group;
  private headNode: THREE.Object3D | null = null;
  private animationFrameId: number | null = null;

  // Head rotation tracking
  private initialHeadRotationY: number = 0;
  private initialHeadRotationX: number = 0;
  private targetRotationY: number = 0;
  private targetRotationX: number = 0;
  private currentRotationY: number = 0;
  private currentRotationX: number = 0;

  constructor(private threeDService: ThreeDService) {}

  ngOnInit(): void {
    this.checkIfMobile();
    this.generateParticles();

    // Sequence the UI reveals
    this.timeouts.push(
      setTimeout(() => { this.brandingVisible = true; }, 800),
      setTimeout(() => { this.buttonVisible = true; }, 1500)
    );

    // Initial glow center
    this.updateGlowPosition(window.innerWidth / 2, window.innerHeight / 2);

    // Initialize Three.js after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.initThreeJS();
    }, 100);
  }

  ngOnDestroy(): void {
    this.timeouts.forEach(t => clearTimeout(t));

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
    if (this.scene) {
      this.scene.clear();
    }
  }

  /**
   * ✅ ENHANCED: Load GLB and setup complete scene
   */
  private async initThreeJS(): Promise<void> {
    try {
      // Use ThreeDService but skip its internal animation loop
      const { scene, camera, renderer, model } = await this.threeDService.loadGLB(
        'splashCanvas',
        'assets/3d/splash-robot.glb',
        {
          transparent: false,           // ✅ Make robot OPAQUE
          primaryColor: '#7c3aed',
          glowColor: '#ec4899',
          backgroundColor: '#000000',
          autoAnimate: false            // ✅ Take manual control
        }
      );

      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
      this.model = model;

      // 1. Setup renderer for cinema quality
      this.setupRenderer();

      // 2. Setup 5-light cinematic lighting
      this.setupEnhancedLighting();

      // 3. Apply glossy neon materials
      this.applyPremiumMaterials(model);

      // 4. Find and setup head tracking
      this.findAndSetupHeadNode(model);

      // 5. Position camera for best view
      this.setupCamera();

      // Start the animation loop
      this.animateThreeJS();

      console.log('✅ Enhanced splash screen initialized successfully');

    } catch (e) {
      console.error('Failed to load splash robot:', e);
    }
  }

  private setupRenderer(): void {
    this.renderer.setClearColor(0x0a0a0a, 0); // Transparent canvas, handled by wrapper BG
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private setupEnhancedLighting(): void {
    // Clear existing lights from ThreeDService if any
    this.scene.children = this.scene.children.filter(child => !(child instanceof THREE.Light));

    // KEY LIGHT (Main)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    this.scene.add(keyLight);

    // FILL LIGHT (Soft side)
    const fillLight = new THREE.DirectionalLight(0xd946ef, 0.8);
    fillLight.position.set(-5, 4, -3);
    this.scene.add(fillLight);

    // RIM LIGHT (Edge glow)
    const rimLight = new THREE.PointLight(0xec4899, 1.5);
    rimLight.position.set(0, 3, -6);
    this.scene.add(rimLight);

    // BOTTOM ACCENT
    const bottomLight = new THREE.PointLight(0x7c3aed, 1.2);
    bottomLight.position.set(0, -3, 2);
    this.scene.add(bottomLight);

    // AMBIENT
    const ambientLight = new THREE.AmbientLight(0x1a0033, 0.5);
    this.scene.add(ambientLight);
  }

  private applyPremiumMaterials(model: THREE.Group): void {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const nameLower = child.name.toLowerCase();

        // 🤖 HEAD: Glossy purple with neon pink emissive glow
        if (nameLower.includes('head') || nameLower.includes('robothead')) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0x7c3aed,
            metalness: 0.8,
            roughness: 0.15,
            emissive: 0xec4899,
            emissiveIntensity: 0.4,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
          });
        }

        // 👁️ EYES: White glossy
        else if (nameLower.includes('eye') || nameLower.includes('pupil')) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 1.0,
            metalness: 0.9,
            roughness: 0.05
          });
        }

        // 📦 BODY/BASE: Metallic dark purple
        else if (nameLower.includes('body') || nameLower.includes('base') || nameLower.includes('cube')) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0x1a0a2e,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0xec4899,
            emissiveIntensity: 0.2
          });
        }

        // Hide background elements if any
        else if (nameLower.includes('bg') || nameLower.includes('floor')) {
          child.visible = false;
        }

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  private findAndSetupHeadNode(model: THREE.Group): void {
    model.traverse((child) => {
      if (child.name.toLowerCase().includes('head')) {
        this.headNode = child;
        this.initialHeadRotationY = child.rotation.y;
        this.initialHeadRotationX = child.rotation.x;
        return;
      }
    });
  }

  private setupCamera(): void {
    // Normal centered camera position
    this.camera.position.set(0, 1.2, 4);
    this.camera.lookAt(0, 0.5, 0);
    this.camera.updateProjectionMatrix();

    // Shift the model itself slightly right to balance with the left-aligned text
    if (this.model) {
      this.model.position.x = 0.5;
    }
  }

  private animateThreeJS(): void {
    const loop = () => {
      if (!this.renderer || !this.scene || !this.camera) return;

      // Subtle float animation
      if (this.model) {
        this.model.position.y = Math.sin(Date.now() * 0.001) * 0.08 + 0.2;
      }

      // Smooth Lerp for rotation
      const lerp = 0.1;
      this.currentRotationY += (this.targetRotationY - this.currentRotationY) * lerp;
      this.currentRotationX += (this.targetRotationX - this.currentRotationX) * lerp;

      if (this.headNode) {
        this.headNode.rotation.y = this.initialHeadRotationY + this.currentRotationY;
        this.headNode.rotation.x = this.initialHeadRotationX + this.currentRotationX;
      }

      this.renderer.render(this.scene, this.camera);
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isExiting || this.isMobile) return;

    this.updateGlowPosition(event.clientX, event.clientY);

    // Normalize mouse to -1..1 range for tracking
    const nx = (event.clientX / window.innerWidth) * 2 - 1;
    const ny = -(event.clientY / window.innerHeight) * 2 + 1;

    this.targetRotationY = nx * (Math.PI / 4); // 45 deg max
    this.targetRotationX = -ny * (Math.PI / 8); // Slightly less vertical
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isExiting) return;
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      this.onEnterClick();
    }
  }

  private updateGlowPosition(x: number, y: number): void {
    if (!this.splashWrapper) return;
    const xp = (x / window.innerWidth) * 100;
    const yp = (y / window.innerHeight) * 100;
    this.splashWrapper.nativeElement.style.setProperty('--mouse-x', `${xp}%`);
    this.splashWrapper.nativeElement.style.setProperty('--mouse-y', `${yp}%`);
  }

  onEnterClick(): void {
    if (this.isExiting) return;
    this.isExiting = true;
    setTimeout(() => {
      this.splashComplete.emit();
    }, 1100);
  }

  private checkIfMobile(): void {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private generateParticles(): void {
    const count = this.isMobile ? 12 : 25;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 3,
        opacity: Math.random() * 0.4 + 0.1
      });
    }
  }
}
