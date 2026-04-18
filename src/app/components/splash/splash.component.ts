import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef, ViewChild, HostListener, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application } from '@splinetool/runtime';

/**
 * ✅ SPLINE-POWERED Splash Component
 * 
 * Uses @splinetool/runtime to render the 3D robot scene
 * directly on a canvas. The Spline scene has built-in
 * cursor-following logic (robot neck tracks mouse).
 * 
 * LAYERS:
 * 1. Spline 3D Canvas (full viewport) - robot with cursor tracking
 * 2. Ambient Glow overlay (follows mouse)
 * 3. Particle field (floating particles)
 * 4. UI overlay (branding top-left, explore button bottom-center)
 * 5. Vignettes (top & bottom atmospheric gradients)
 */
@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() splashComplete = new EventEmitter<void>();
  @ViewChild('splashWrapper', { static: true }) splashWrapper!: ElementRef;
  @ViewChild('splashCanvas', { static: false }) splashCanvas!: ElementRef<HTMLCanvasElement>;

  // UI state
  isExiting = false;
  brandingVisible = false;
  buttonVisible = false;
  isLoading = true;
  loadProgress = 0;
  isMobile = false;

  particles: any[] = [];
  private timeouts: any[] = [];

  // Spline instance
  private splineApp: Application | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.checkIfMobile();
    this.generateParticles();

    // Initial glow center
    this.updateGlowPosition(window.innerWidth / 2, window.innerHeight / 2);
  }

  ngAfterViewInit(): void {
    // Initialize Spline after view is ready
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => this.initSpline(), 100);
    });
  }

  ngOnDestroy(): void {
    this.timeouts.forEach(t => clearTimeout(t));

    if (this.splineApp) {
      this.splineApp.dispose();
      this.splineApp = null;
    }
  }

  /**
   * Initialize Spline 3D scene on the canvas
   */
  private async initSpline(): Promise<void> {
    try {
      const canvas = this.splashCanvas?.nativeElement;
      if (!canvas) {
        console.error('Splash canvas not found');
        return;
      }

      // Create Spline Application on the canvas
      this.splineApp = new Application(canvas);

      // Load the splinecode scene file from assets
      // The scene already contains cursor-following logic
      await this.splineApp.load('assets/3d/scene.splinecode');

      console.log('✅ Spline 3D scene loaded successfully');

      // Hide the "Get in touch" button from the Spline scene
      this.hideSplineUIElements();

      // Scene loaded - reveal UI elements
      this.ngZone.run(() => {
        this.isLoading = false;

        // Sequence the UI reveals
        this.timeouts.push(
          setTimeout(() => { this.brandingVisible = true; }, 400),
          setTimeout(() => { this.buttonVisible = true; }, 1000)
        );
      });

    } catch (e) {
      console.error('Failed to load Spline scene:', e);

      // Fallback: still show UI even if 3D fails
      this.ngZone.run(() => {
        this.isLoading = false;
        this.brandingVisible = true;
        this.buttonVisible = true;
      });
    }
  }

  /**
   * Hide UI elements embedded in the Spline scene 
   * (e.g., "Get in touch" button) so we only use our own HTML buttons
   */
  private hideSplineUIElements(): void {
    if (!this.splineApp) return;

    try {
      // Try to find and hide the "Get in touch" button from the Spline scene
      // Spline objects can be accessed by name
      const possibleNames = [
        'Get in touch', 'get in touch', 'GetInTouch', 'Button', 'button',
        'CTA', 'cta', 'Text', 'text-button', 'btn'
      ];

      for (const name of possibleNames) {
        try {
          const obj = this.splineApp.findObjectByName(name);
          if (obj) {
            obj.visible = false;
            console.log(`✅ Hidden Spline object: "${name}"`);
          }
        } catch {
          // Object not found, continue
        }
      }

      // Also try to hide all text/button objects that might be in the scene
      const allObjects = this.splineApp.getAllObjects();
      if (allObjects) {
        for (const obj of allObjects) {
          const nameLower = (obj.name || '').toLowerCase();
          if (nameLower.includes('button') || 
              nameLower.includes('get in touch') || 
              nameLower.includes('cta') ||
              nameLower.includes('text-btn') ||
              nameLower.includes('link')) {
            obj.visible = false;
            console.log(`✅ Hidden Spline UI object: "${obj.name}"`);
          }
        }
      }
    } catch (e) {
      console.warn('Could not hide Spline UI elements:', e);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isExiting || this.isMobile) return;

    // Update ambient glow position
    this.updateGlowPosition(event.clientX, event.clientY);

    // Note: Spline handles cursor tracking internally via its scene events
    // The robot's head follows the cursor automatically through the Spline runtime
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isExiting) return;
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      this.onEnterClick();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    // Spline runtime handles canvas resizing automatically
    this.checkIfMobile();
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
