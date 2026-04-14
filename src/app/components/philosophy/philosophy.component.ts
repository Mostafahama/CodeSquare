import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WritingTextComponent } from '../shared/writing-text.component';

@Component({
  selector: 'app-philosophy',
  standalone: true,
  imports: [CommonModule, WritingTextComponent],
  template: `
    <section id="philosophy-section" class="relative bg-[#030303] overflow-hidden">
      <div class="flex flex-col lg:flex-row min-h-[70vh] md:min-h-[80vh]">
        
        <!-- Left Side: Geometric Ambient Mesh -->
        <div class="w-full lg:w-1/2 relative bg-gradient-to-br from-[#0A0A1F] to-[#030303] overflow-hidden min-h-[40vh] lg:min-h-full">
          <div class="ambient-glow absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#A855F7] opacity-[0.08] blur-[120px] rounded-full mix-blend-screen"></div>
          <div class="ambient-glow absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#EC4899] opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" style="animation-delay: -5s"></div>
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQuNjI3IDU0LjYyN0w1MCA1OS4yNTRWMjBoMTEuMjU0TDYxLjI1NCAyMC43NDZMMTYuNzQ2IDY1LjI1NEg1LjQ5MkwwIDEwVjBioiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-10 pointer-events-none mix-blend-overlay"></div>
          <div class="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#A855F7]/30 to-transparent"></div>
        </div>

        <!-- Right Side: Text Content -->
        <div class="w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-8 lg:px-20 py-20 lg:py-0 bg-[#030303]">
          <div class="max-w-[500px]" #contentWrapper>
            <h2 class="font-space font-bold text-4xl md:text-[42px] text-[#A855F7] tracking-tight mb-8 opacity-0 translate-y-8" #heading>
              Our Philosophy
            </h2>
            
            <p class="font-inter font-light text-[18px] text-[#F8FAFC] leading-[1.8] mb-8">
              <app-writing-text [text]="philosophyText" [delay]="200"></app-writing-text>
            </p>

            <ul class="font-inter font-light text-[16px] xl:text-[18px] text-[#CBD5E1] leading-[1.8] space-y-4 m-0 p-0 list-none mt-10">
              <li class="flex items-start gap-4 opacity-0 translate-y-8" #li1>
                <span class="text-[#A855F7] mt-1">✦</span>
                <span>We don't chase trends. We build fundamentals that last.</span>
              </li>
              <li class="flex items-start gap-4 opacity-0 translate-y-8" #li2>
                <span class="text-[#A855F7] mt-1">✦</span>
                <span>We don't just code. We architect for scale.</span>
              </li>
              <li class="flex items-start gap-4 opacity-0 translate-y-8" #li3>
                <span class="text-[#A855F7] mt-1">✦</span>
                <span>We're not just service providers. We're your technology partner.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .ambient-glow {
      animation: shiftGlow 15s ease-in-out infinite alternate;
    }
    @keyframes shiftGlow {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(5%, 10%) scale(1.1); }
      100% { transform: translate(-5%, -5%) scale(0.95); }
    }
  `]
})
export class PhilosophyComponent implements AfterViewInit {
  @ViewChild('contentWrapper') contentWrapper!: ElementRef;
  @ViewChild('heading') heading!: ElementRef;
  @ViewChild('li1') li1!: ElementRef;
  @ViewChild('li2') li2!: ElementRef;
  @ViewChild('li3') li3!: ElementRef;

  // Text as component property — avoids template escaping issues
  philosophyText = "Every project is unique. Every business is different. That's why we start with deep understanding—not templates. We analyze your needs, understand your goals, and architect solutions that scale with your growth.";

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
    }, { threshold: 0.3 });
    observer.observe(this.contentWrapper.nativeElement);
  }

  private animateSection() {
    const tl = gsap.timeline();
    tl.to(this.heading.nativeElement, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    tl.to([this.li1.nativeElement, this.li2.nativeElement, this.li3.nativeElement], {
      opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out"
    }, "0.6");
  }
}
