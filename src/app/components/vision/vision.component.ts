import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { TranslationService } from '../../services/translation.service';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="brand-statement" class="relative py-24 lg:py-32 px-6 lg:px-20 bg-[#030303] overflow-hidden" [attr.dir]="translationService.currentDir()">
      <!-- Subtle top-bottom gradient background -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#030303] to-[#0A0A1F] opacity-90 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto relative z-10" #contentWrapper>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <!-- VISION CARD -->
          <div #card1 class="relative group bg-[rgba(255,255,255,0.04)] border border-[rgba(168,85,247,0.2)] rounded-xl p-10 lg:p-12 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] hover:border-[#A855F7] opacity-0 scale-95">
            
            <!-- Top border accent -->
            <div #topBorder1 class="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-t-xl origin-inline-start scale-x-0 transition-transform duration-300"></div>

            <!-- Header Badge -->
            <div class="bg-[rgba(168,85,247,0.2)] border border-[rgba(168,85,247,0.4)] px-3 py-1.5 rounded w-fit mb-8">
              <span class="text-[#A855F7] text-xs font-bold tracking-widest uppercase">{{ translations().badge }}</span>
            </div>

            <div class="mb-8">
              <h2 class="font-space font-bold text-3xl lg:text-4xl text-[#F8FAFC] mb-6 tracking-tight leading-tight">
                {{ translations().vision_title }}
              </h2>
              <p class="font-inter font-light text-[#CBD5E1] text-lg lg:text-xl leading-relaxed">
                {{ translations().vision_desc }}
              </p>
            </div>

            <!-- Corner Accent -->
            <div class="absolute top-0 end-0 w-5 h-5 bg-[#A855F7] opacity-[0.1] rounded-te-xl rtl:rounded-ts-xl rtl:rounded-te-none"></div>
          </div>

          <!-- MISSION CARD -->
          <div #card2 class="relative group bg-[rgba(255,255,255,0.04)] border border-[rgba(168,85,247,0.2)] rounded-xl p-10 lg:p-12 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] hover:border-[#A855F7] opacity-0 scale-95">
            
            <!-- Top border accent -->
            <div #topBorder2 class="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-t-xl origin-inline-start scale-x-0 transition-transform duration-300"></div>

            <!-- Header Badge -->
            <div class="bg-[rgba(168,85,247,0.2)] border border-[rgba(168,85,247,0.4)] px-3 py-1.5 rounded w-fit mb-8">
              <span class="text-[#A855F7] text-xs font-bold tracking-widest uppercase">{{ translations().badge }}</span>
            </div>

            <div class="mb-8">
              <h2 class="font-space font-bold text-3xl lg:text-4xl text-[#F8FAFC] mb-6 tracking-tight leading-tight">
                {{ translations().mission_title }}
              </h2>
              <p class="font-inter font-light text-[#CBD5E1] text-lg lg:text-xl leading-relaxed">
                {{ translations().mission_desc }}
              </p>
            </div>

            <!-- Corner Accent -->
            <div class="absolute top-0 end-0 w-5 h-5 bg-[#A855F7] opacity-[0.1] rounded-te-xl rtl:rounded-ts-xl rtl:rounded-te-none"></div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .duration-400 { transition-duration: 400ms; }
  `]
})
export class VisionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('card1', { static: true }) card1!: ElementRef;
  @ViewChild('card2', { static: true }) card2!: ElementRef;
  @ViewChild('topBorder1', { static: true }) topBorder1!: ElementRef;
  @ViewChild('topBorder2', { static: true }) topBorder2!: ElementRef;
  @ViewChild('contentWrapper', { static: true }) contentWrapper!: ElementRef;

  public translationService = inject(TranslationService);
  translations = this.translationService.getTranslations('vision');

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
    }, { threshold: 0.2 });

    observer.observe(this.contentWrapper.nativeElement);
  }

  private animateSection() {
    const tl = gsap.timeline();

    // Cards Fade-in + Scale
    tl.to(this.card1.nativeElement, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    });

    tl.to(this.card2.nativeElement, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Top Border Draw
    tl.to(this.topBorder1.nativeElement, {
      scaleX: 1,
      duration: 0.6,
      ease: "power3.out"
    }, 0.3);

    tl.to(this.topBorder2.nativeElement, {
      scaleX: 1,
      duration: 0.6,
      ease: "power3.out"
    }, 0.5);
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
