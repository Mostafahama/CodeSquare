import { Component, inject, effect, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { SplashComponent } from './components/splash/splash.component';
import { NavComponent } from './components/navigation/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { VisionComponent } from './components/vision/vision.component';
import { StrengthsComponent } from './components/strengths/strengths.component';
import { ServicesComponent } from './components/services/services.component';
import { ProcessComponent } from './components/process/process.component';
import { PhilosophyComponent } from './components/philosophy/philosophy.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    SplashComponent, 
    NavComponent, 
    HeroComponent, 
    AboutComponent, 
    VisionComponent, 
    StrengthsComponent, 
    ServicesComponent, 
    ProjectsComponent,
    ProcessComponent, 
    PhilosophyComponent, 
    CtaSectionComponent,
    FooterComponent
  ],
  template: `
    <app-splash *ngIf="showSplash" (splashComplete)="onSplashComplete()"></app-splash>
    
    <ng-container *ngIf="!showSplash">
      <app-nav></app-nav>
      <div class="fade-in-content">
        <app-hero></app-hero>
        
        <app-about></app-about>
        
        <app-vision></app-vision>
        
        @defer (on viewport) {
          <app-strengths></app-strengths>
        } @placeholder {
          <div style="height: 600px; background: transparent;"></div>
        }

        @defer (on viewport) {
          <app-services></app-services>
        } @placeholder {
          <div style="height: 600px; background: transparent;"></div>
        }

        @defer (on viewport) {
          <app-projects></app-projects>
        } @placeholder {
          <div style="height: 600px; background: transparent;"></div>
        }
        
        @defer (on viewport) {
          <app-process></app-process>
        } @placeholder {
          <div style="height: 600px; background: transparent;"></div>
        }

        @defer (on viewport) {
          <app-philosophy></app-philosophy>
        } @placeholder {
          <div style="height: 600px; background: transparent;"></div>
        }



        @defer (on viewport) {
          <app-footer></app-footer>
        } @placeholder {
          <div style="height: 300px; background: transparent;"></div>
        }
      </div>
    </ng-container>
  `,
  styles: [`
    .fade-in-content {
      animation: fadeIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      opacity: 0;
      transform: scale(0.98);
    }
    @keyframes fadeIn {
      0% { opacity: 0; transform: scale(0.98); }
      100% { opacity: 1; transform: none; }
    }
  `]
})
export class AppComponent {
  private translationService = inject(TranslationService);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  showSplash = true;

  constructor() {
    // Synchronize global document direction and language attributes
    effect(() => {
      const dir = this.translationService.currentDir();
      const lang = this.translationService.currentLang();
      
      this.renderer.setAttribute(this.document.documentElement, 'dir', dir);
      this.renderer.setAttribute(this.document.documentElement, 'lang', lang);
      
      // Also apply class to body for easier Tailwind targeting if dir attribute is tricky
      if (dir === 'rtl') {
        this.renderer.addClass(this.document.body, 'rtl');
        this.renderer.setAttribute(this.document.body, 'dir', 'rtl');
      } else {
        this.renderer.removeClass(this.document.body, 'rtl');
        this.renderer.setAttribute(this.document.body, 'dir', 'ltr');
      }
    });
  }

  onSplashComplete(): void {
    this.showSplash = false;
  }
}
