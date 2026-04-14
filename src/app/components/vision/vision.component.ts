import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="vision-mission" class="relative pt-[100px] pb-[100px] px-10 bg-[#0A0A1F] overflow-hidden">
      <!-- Subtle top-bottom gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#030303] to-[#0A0A1F] opacity-90 pointer-events-none"></div>

      <div class="max-w-[1280px] mx-auto relative z-10" #contentWrapper>
        
        <!-- Section Header -->
        <div class="mb-16">
          <h2 class="font-space font-bold text-4xl md:text-5xl text-[#F8FAFC] tracking-tight mb-4">Our Vision & Mission</h2>
          <p class="font-inter font-light text-[16px] text-[#A855F7]">Long-term partnership for sustainable growth</p>
        </div>

        <!-- 2-Card Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <!-- VISION CARD -->
          <div #card1 class="relative group bg-[rgba(255,255,255,0.04)] border border-[rgba(168,85,247,0.2)] rounded-xl p-10 lg:p-12 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] hover:border-[#A855F7] opacity-0 scale-95">
            
            <!-- Top border accent -->
            <div #topBorder1 class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-t-xl origin-left scale-x-0 transition-transform duration-300"></div>

            <!-- Header Badge -->
            <div class="bg-[rgba(168,85,247,0.2)] border border-[rgba(168,85,247,0.4)] px-3 py-1.5 rounded w-fit mb-8">
              <span class="font-inter font-medium text-[12px] uppercase text-[#A855F7] tracking-wider">Vision</span>
            </div>

            <!-- Content -->
            <div class="content-text opacity-0">
              <h3 class="font-space font-semibold text-[24px] text-[#F8FAFC] leading-snug mb-6 group-hover:text-white transition-colors duration-400">
                To be a trusted technology partner...
              </h3>
              <p class="font-inter font-light text-[18px] text-[#CBD5E1] leading-[1.7] m-0">
                To be a trusted technology partner that transforms ideas into powerful digital solutions, helping businesses grow faster, smarter, and beyond limits.
              </p>
            </div>

            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-5 h-5 bg-[#A855F7] opacity-[0.1] rounded-tr-xl"></div>
          </div>

          <!-- MISSION CARD -->
          <div #card2 class="relative group bg-[rgba(255,255,255,0.04)] border border-[rgba(168,85,247,0.2)] rounded-xl p-10 lg:p-12 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] hover:border-[#A855F7] opacity-0 scale-95">
            
            <!-- Top border accent -->
            <div #topBorder2 class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-t-xl origin-left scale-x-0 transition-transform duration-300"></div>

            <!-- Header Badge -->
            <div class="bg-[rgba(168,85,247,0.2)] border border-[rgba(168,85,247,0.4)] px-3 py-1.5 rounded w-fit mb-8">
              <span class="font-inter font-medium text-[12px] uppercase text-[#A855F7] tracking-wider">Mission</span>
            </div>

            <!-- Content -->
            <div class="content-text opacity-0">
              <h3 class="font-space font-semibold text-[24px] text-[#F8FAFC] leading-snug mb-6 group-hover:text-white transition-colors duration-400">
                Empowering growing businesses...
              </h3>
              <p class="font-inter font-light text-[18px] text-[#CBD5E1] leading-[1.7] m-0">
                Empowering businesses with custom software, scalable architectures, and intelligent systems that solve real-world problems and drive measurable outcomes.
              </p>
            </div>

            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-5 h-5 bg-[#A855F7] opacity-[0.1] rounded-tr-xl"></div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .duration-400 { transition-duration: 400ms; }
  `]
})
export class VisionComponent implements AfterViewInit {
  @ViewChild('contentWrapper') contentWrapper!: ElementRef;
  @ViewChild('card1') card1!: ElementRef;
  @ViewChild('card2') card2!: ElementRef;
  @ViewChild('topBorder1') topBorder1!: ElementRef;
  @ViewChild('topBorder2') topBorder2!: ElementRef;

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
    }, "-=0.6"); // 0.2s delay from start sequence

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

    // Content Text fade in
    const textElements1 = this.card1.nativeElement.querySelectorAll('.content-text');
    const textElements2 = this.card2.nativeElement.querySelectorAll('.content-text');

    tl.to([textElements1, textElements2], {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, 0.5);
  }
}
