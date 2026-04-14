import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Injectable({ providedIn: 'root' })
export class ThreeDService {
  
  loadGLB(canvasId: string, modelPath: string, options: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (!canvas) {
        reject(new Error(`Canvas with id '${canvasId}' not found`));
        return;
      }

      // Scene setup
      const scene = new THREE.Scene();
      // Optional transparent or solid background
      if (!options.transparent) {
        scene.background = new THREE.Color(options.backgroundColor || 0x1E1B4B);
      } else {
        scene.background = null;
      }

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 3;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true, 
        alpha: true 
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
      dirLight.position.set(5, 10, 7);
      scene.add(dirLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
      fillLight.position.set(-5, 5, 5);
      scene.add(fillLight);

      // Load GLB model
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene;

          // Load model natively without destroying its original textures/colors
          // The GLB files already contain the designer's requested colors
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          // Handle animations if present
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();

            if (options.autoAnimate !== false) {
              const clock = new THREE.Clock();
              const animate = () => {
                requestAnimationFrame(animate);
                mixer.update(clock.getDelta());
                renderer.render(scene, camera);
              };
              animate();
            }
          } else if (options.autoAnimate !== false) {
            // Simple render loop
            const animate = () => {
              requestAnimationFrame(animate);
              renderer.render(scene, camera);
            };
            animate();
          }

          this.applyMaterialColor(model, options);
          scene.add(model);
          resolve({ scene, camera, renderer, model });
        },
        (progress) => {
          console.log(`Loading model: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
        },
        (error) => {
          console.error('Error loading GLB:', error);
          reject(error);
        }
      );
    });
  }

  private applyMaterialColor(object: THREE.Object3D, options: any): void {
    if (options.preserveOriginalColors) {
      // Just ensure lighting roughness is good but do not override the built-in colors
      object.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat: any) => {
            mat.roughness = Math.max(0.1, mat.roughness || 0.2);
          });
        }
      });
      return;
    }

    const primaryObj = new THREE.Color(options.primaryColor);
    const glowObj = new THREE.Color(options.glowColor || options.accentColor || options.primaryColor);
    
    object.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat: any) => {
          if (mat.color) mat.color.set(primaryObj);
          if (mat.emissive) {
            mat.emissive.set(glowObj);
            mat.emissiveIntensity = 0.1;
          }
          // Enable better shadows/lighting rendering material properties
          mat.roughness = Math.max(0.2, mat.roughness || 0.4);
          mat.metalness = Math.max(0.1, mat.metalness || 0.3);
        });
      }
    });
  }
}
