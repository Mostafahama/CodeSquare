import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './components/splash/splash.component';
import { NavComponent } from './components/navigation/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { VisionComponent } from './components/vision/vision.component';
import { StrengthsComponent } from './components/strengths/strengths.component';
import { ServicesComponent } from './components/services/services.component';
import { ProcessComponent } from './components/process/process.component';
import { PhilosophyComponent } from './components/philosophy/philosophy.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';

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
        <!-- Prompt 1: Hero Brand Statement -->
        <app-about></app-about>
        <!-- Prompt 2: Vision & Mission -->
        <app-vision></app-vision>
        <!-- Prompt 3: Key Strengths Grid -->
        <app-strengths></app-strengths>
        <!-- Prompt 4: Services Masonry -->
        <app-services></app-services>
        <!-- Projects Showcase -->
        <app-projects></app-projects>
        
        <app-process></app-process>
        <!-- Prompt 5: Team Philosophy -->
        <app-philosophy></app-philosophy>
        
        <app-cta-section></app-cta-section>
        <app-footer></app-footer>
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
  showSplash = true;
  currentYear = new Date().getFullYear();

  onSplashComplete(): void {
    this.showSplash = false;
  }
}
