import { Component, ElementRef, ViewChild, AfterViewInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TranslationService } from '../../services/translation.service';

interface Strength {
  title: string;
  description: string;
  iconPath: string; 
}

@Component({
  selector: 'app-strengths',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="strengths-section" class="relative pt-[80px] pb-[80px] px-4 md:px-10 bg-[#030303] overflow-hidden" [attr.dir]="translationService.currentDir()">
      <!-- Subtle top-bottom gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#0A0A1F] to-[#030303] opacity-5 pointer-events-none"></div>
      
      <!-- Optional Geometric Pattern -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] pointer-events-none"></div>

      <div class="max-w-[1400px] mx-auto relative z-10" #contentWrapper>
        
        <!-- Section Header -->
        <div class="mb-10 md:mb-14 text-center">
          <h2 class="font-space font-bold text-2xl md:text-5xl text-[#F8FAFC] tracking-tight mb-3 md:mb-4">
            {{ translations().title }}
          </h2>
          <p class="font-inter font-light text-[14px] md:text-[16px] text-[#A855F7]">
            {{ translations().subtitle }}
          </p>
        </div>

        <!-- Strengths Grid -->
        <div class="strengths-grid" #gridContainer>
          
          <div *ngFor="let item of strengths(); let i = index" 
               class="strength-card group opacity-0 scale-95">
            
            <div class="card-icon-wrap">
              <svg class="card-icon text-[#A855F7] opacity-70 group-hover:opacity-100 transition-all duration-2000 icon-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path [attr.d]="item.iconPath" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.description }}</p>
          </div>
          
        </div>

      </div>
    </section>
  `,
  styles: [`
    .duration-400 { transition-duration: 400ms; }
    .duration-2000 { transition-duration: 2000ms; }
    
    .icon-spin {
      transform-origin: center;
    }
    
    .strength-card:hover .icon-spin {
      transform: rotate(360deg);
    }

    /* ===== GRID ===== */
    .strengths-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    /* ===== CARD ===== */
    .strength-card {
      position: relative;
      background: transparent;
      border: 2px solid rgba(168, 85, 247, 0.3);
      border-radius: 12px;
      padding: 32px;
      transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .strength-card:hover {
      border-color: #A855F7;
      background: rgba(168, 85, 247, 0.02);
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 0 30px rgba(168, 85, 247, 0.2);
    }

    .card-icon-wrap {
      margin-bottom: 20px;
      flex-shrink: 0;
    }

    .card-icon {
      width: 48px;
      height: 48px;
    }

    .card-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 18px;
      color: #F8FAFC;
      line-height: 1.3;
      margin: 0 0 10px 0;
      flex-shrink: 0;
    }

    .card-desc {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 14px;
      color: #CBD5E1;
      margin: 0;
      line-height: 1.6;
      flex-grow: 1;
    }

    /* ===== TABLET (2 col) ===== */
    @media (max-width: 1024px) {
      .strengths-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
    }

    /* ===== MOBILE (3 col compact) ===== */
    @media (max-width: 768px) {
      .strengths-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }

      .strength-card {
        padding: 14px 10px;
        border-radius: 10px;
        border-width: 1px;
      }

      .card-icon-wrap {
        margin-bottom: 8px;
      }

      .card-icon {
        width: 24px;
        height: 24px;
      }

      .card-title {
        font-size: 11px;
        margin-bottom: 4px;
      }

      .card-desc {
        font-size: 9px;
        line-height: 1.4;
      }
    }

    /* ===== VERY SMALL (3 col still) ===== */
    @media (max-width: 380px) {
      .strengths-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
      }
      .strength-card {
        padding: 10px 8px;
      }
      .card-icon {
        width: 20px;
        height: 20px;
      }
      .card-title {
        font-size: 10px;
      }
      .card-desc {
        font-size: 8px;
      }
    }
  `]
})
export class StrengthsComponent implements AfterViewInit {
  @ViewChild('gridContainer') gridContainer!: ElementRef;
  
  public translationService = inject(TranslationService);
  translations = this.translationService.getTranslations('strengths');

  private iconPaths = [
    "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
    "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    "M4.5 12.75l6 6 9-13.5",
    "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.879-6.836A1.5 1.5 0 0018 3h-3.873c-.28 0-.555.087-.792.246l-7.447 5.029a16.002 16.002 0 00-4.321 4.316m-2.483 3.4c.078-.35.22-.676.417-1.002m0 0a15.994 15.994 0 014.28-4.281",
    "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.438 4.438 0 002.94 2.88c1.464.406 3.04.093 4.186-.823a4.5 4.5 0 001.272-4.982"
  ];

  strengths = computed<Strength[]>(() => {
    const items = this.translations().items;
    return this.iconPaths.map((path, i) => ({
      title: items[i].title,
      description: items[i].desc,
      iconPath: path
    }));
  });

  private hasAnimated = false;

  async ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateSection();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.gridContainer.nativeElement);
  }

  private animateSection() {
    const cards = this.gridContainer.nativeElement.querySelectorAll('.strength-card');
    
    gsap.to(cards, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });
  }
}
