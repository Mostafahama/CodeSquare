import { Component, Input, OnInit, ElementRef, ViewChild, ViewChildren, QueryList, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="service-card group h-full flex flex-col" 
         [ngClass]="'align-' + align"
         (mouseenter)="onEnter()"
         (mouseleave)="onLeave()">
      
      <!-- Top Lilac Border Accent -->
      <div class="absolute top-0 start-0 w-full h-[2px] bg-[#A855F7] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <!-- Icon Container -->
      <div class="card-icon mb-6" [innerHTML]="safeIcon"></div>
      
      <!-- Content Container -->
      <div class="card-content flex-grow flex flex-col">
          <h3 class="card-title">{{ title }}</h3>
          <p class="card-description">{{ description }}</p>
          
          <!-- Expandable Features List -->
          <div class="features-list mt-8 flex flex-wrap gap-2">
            <span *ngFor="let feature of features" 
                  #featurePill
                  class="feature-pill text-xs font-inter font-light text-lilac px-3 py-1 rounded bg-[#A855F7]/10 border border-[#A855F7]/30 opacity-0 translate-y-2">
              {{ feature }}
            </span>
          </div>


      </div>
      
      <!-- Premium Centered Hover Glow -->
      <div class="card-glow absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[#A855F7]/20 blur-[80px] rounded-full opacity-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 z-[-1]"></div>
    </div>
  `,
  styles: [`
    .service-card {
      position: relative;
      width: 100%;
      padding: 40px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(168, 85, 247, 0.1);
      border-top: 2px solid #A855F7;
      border-radius: 12px;
      cursor: pointer;
      overflow: hidden;
      z-index: 1;
      will-change: transform;
      /* GSAP handles transform, but background/border handled by CSS */
      transition: background 0.5s ease-out, border-color 0.5s ease-out;
    }

    .service-card:hover {
      background: rgba(168, 85, 247, 0.05);
      border-color: rgba(168, 85, 247, 0.3);
    }

    .card-icon {
      width: 64px;
      height: 64px;
      opacity: 0.8;
      transition: transform 0.5s ease-out;
    }
    
    .service-card:hover .card-icon {
      transform: rotate(5deg) scale(1.05);
    }
    
    ::ng-deep .card-icon svg {
        width: 100%;
        height: 100%;
        stroke: #A855F7;
        stroke-width: 1.5;
        fill: none;
    }

    .card-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 1.5rem;
      color: #F8FAFC;
      margin: 0 0 12px 0;
      line-height: 1.2;
    }

    .card-description {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 0.95rem;
      color: #CBD5E1;
      line-height: 1.6;
      margin: 0;
    }

    /* Alignment System */
    .align-center {
      text-align: center;
      align-items: center;
    }
    .align-center .features-list {
      justify-content: center;
    }
    .align-center .mt-auto {
      justify-content: center;
    }
    .align-left {
      text-align: left;
      align-items: flex-start;
    }

    @media (max-width: 768px) {
      .service-card {
        padding: 24px 20px;
      }
      .card-icon {
        width: 48px;
        height: 48px;
        margin-bottom: 12px;
      }
      .card-title {
        font-size: 1.15rem;
        margin-bottom: 8px;
      }
      .card-description {
        font-size: 0.85rem;
      }
    }
  `]
})
export class ServiceCardComponent implements OnInit {
  @Input() title = 'Service Title';
  @Input() description = 'Service description';
  @Input() icon: string = '';
  @Input() align: 'left' | 'center' = 'left';
  @Input() features: string[] = [];
  public translationService = inject(TranslationService);
  translations = this.translationService.getTranslations('services');
  @ViewChildren('featurePill') featurePills!: QueryList<ElementRef>;
  
  safeIcon!: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private el: ElementRef) {}

  ngOnInit() {
    this.safeIcon = this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24">${this.icon}</svg>`);
  }

  onEnter() {
    // Advanced Card Lift and Rotate
    gsap.to(this.el.nativeElement.firstElementChild, {
      y: -12,
      rotationZ: 1,
      boxShadow: "0 20px 60px rgba(168, 85, 247, 0.2)",
      duration: 0.4,
      ease: "power3.out",
      overwrite: true
    });

    // Stagger Feature Pills in
    if (this.featurePills && this.featurePills.length > 0) {
      const pills = this.featurePills.map(p => p.nativeElement);
      gsap.to(pills, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true
      });
    }
  }

  onLeave() {
    gsap.to(this.el.nativeElement.firstElementChild, {
      y: 0,
      rotationZ: 0,
      boxShadow: "0 0px 0px rgba(168, 85, 247, 0)",
      duration: 0.4,
      ease: "power3.out",
      overwrite: true
    });

    if (this.featurePills && this.featurePills.length > 0) {
      const pills = this.featurePills.map(p => p.nativeElement);
      gsap.to(pills, {
        opacity: 0,
        y: 8,
        duration: 0.2,
        ease: "power2.in",
        overwrite: true
      });
    }
  }
}
