import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Strength {
  title: string;
  description: string;
  iconPath: string; // The specific SVG `d` path
}

@Component({
  selector: 'app-strengths',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="strengths-section" class="relative pt-[100px] pb-[100px] px-6 md:px-10 bg-[#030303] overflow-hidden">
      <!-- Subtle top-bottom gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#0A0A1F] to-[#030303] opacity-5 pointer-events-none"></div>
      
      <!-- Optional Geometric Pattern -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] pointer-events-none"></div>

      <div class="max-w-[1400px] mx-auto relative z-10" #contentWrapper>
        
        <!-- Section Header -->
        <div class="mb-14 text-center">
          <h2 class="font-space font-bold text-4xl md:text-5xl text-[#F8FAFC] tracking-tight mb-4">Why Choose Code Square</h2>
          <p class="font-inter font-light text-[16px] text-[#A855F7]">8 reasons we're different</p>
        </div>

        <!-- Strengths Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-[20px] lg:gap-[24px]" #gridContainer>
          
          <div *ngFor="let item of strengths; let i = index" 
               class="strength-card group relative bg-transparent border-[2px] border-[rgba(168,85,247,0.3)] rounded-xl p-8 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[#A855F7] hover:bg-[rgba(168,85,247,0.02)] hover:-translate-y-2 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] opacity-0 scale-95">
            
            <div class="mb-6">
              <svg class="w-12 h-12 text-[#A855F7] opacity-70 group-hover:opacity-100 transition-all duration-2000 icon-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path [attr.d]="item.iconPath" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            
            <h3 class="font-space font-semibold text-[18px] text-[#F8FAFC] leading-snug mb-3">{{ item.title }}</h3>
            <p class="font-inter font-light text-[14px] text-[#CBD5E1] m-0 leading-relaxed">{{ item.description }}</p>
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
  `]
})
export class StrengthsComponent implements AfterViewInit {
  @ViewChild('gridContainer') gridContainer!: ElementRef;

  strengths: Strength[] = [
    {
      title: "Deep Business Understanding",
      description: "We analyze your business rules before deploying development architectures.",
      iconPath: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" // search icon
    },
    {
      title: "Custom & Scalable",
      description: "No generic templates. Built natively to grow alongside your increasing traffic.",
      iconPath: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" // blocks
    },
    {
      title: "Deadline Commitment",
      description: "Rigorous agile sprints ensure we map correctly to your time-to-market.",
      iconPath: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" // clock
    },
    {
      title: "Continuous Support",
      description: "Post-launch maintenance ensures sustained digital velocity and reliability.",
      iconPath: "M4.5 12.75l6 6 9-13.5" // check
    },
    {
      title: "Strategic Thinking",
      description: "We partner with visionary frameworks to innovate across digital verticals.",
      iconPath: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" // lightning
    },
    {
      title: "High-quality UI/UX",
      description: "Awwwards-tier visual designs targeting intense user retention.",
      iconPath: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.879-6.836A1.5 1.5 0 0018 3h-3.873c-.28 0-.555.087-.792.246l-7.447 5.029a16.002 16.002 0 00-4.321 4.316m-2.483 3.4c.078-.35.22-.676.417-1.002m0 0a15.994 15.994 0 014.28-4.281" // design generic
    },
    {
      title: "Partnership Mindset",
      description: "Deep integrations directly acting as your outsourced CTO & product arm.",
      iconPath: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" // team partners
    },
    {
      title: "Efficient Execution",
      description: "Streamlined CI/CD pipelines enabling sub-millisecond build iterations.",
      iconPath: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.438 4.438 0 002.94 2.88c1.464.406 3.04.093 4.186-.823a4.5 4.5 0 001.272-4.982" // engine rocket
    }
  ];

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
