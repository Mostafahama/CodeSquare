import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WritingTextComponent } from '../shared/writing-text.component';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-philosophy',
  standalone: true,
  imports: [CommonModule, WritingTextComponent],
  template: `
    <section id="philosophy-section" class="relative bg-[#030303] overflow-hidden" [attr.dir]="translationService.currentDir()">
      <div class="flex flex-col lg:flex-row min-h-[70vh] md:min-h-[80vh]">
        
        <!-- Left Side: Geometric Ambient Mesh -->
        <div class="w-full lg:w-1/2 relative bg-gradient-to-br from-[#0A0A1F] to-[#030303] overflow-hidden min-h-[40vh] lg:min-h-full">
          <div class="ambient-glow absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#A855F7] opacity-[0.08] blur-[120px] rounded-full mix-blend-screen"></div>
          <div class="ambient-glow absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#EC4899] opacity-[0.05] blur-[150px] rounded-full mix-blend-screen" style="animation-delay: -5s"></div>
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQuNjI3IDU0LjYyN0w1MCA1OS4yNTRWMjBoMTEuMjU0TDYxLjI1NCAyMC43NDZMMTYuNzQ2IDY1LjI1NEg1LjQ5MkwwIDEwVjBioiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-10 pointer-events-none mix-blend-overlay"></div>
          <div class="absolute end-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#A855F7]/30 to-transparent"></div>
        </div>

        <!-- Right Side: Text Content -->
        <div class="w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-8 lg:px-20 py-20 lg:py-0 bg-[#030303]">
          <div class="max-w-[500px]" #contentWrapper>
            <h2 class="font-space font-bold text-4xl md:text-[42px] text-[#A855F7] tracking-tight mb-8 opacity-0 translate-y-8" #heading>
              {{ translations().title }}
            </h2>
            
            <p class="font-inter font-light text-[18px] text-[#F8FAFC] leading-[1.8] mb-8">
              <app-writing-text [text]="translations().body" [delay]="200"></app-writing-text>
            </p>

            <ul class="font-inter font-light text-[16px] xl:text-[18px] text-[#CBD5E1] leading-[1.8] space-y-4 m-0 p-0 list-none mt-10">
              <li *ngFor="let pillar of translations().pillars; let i = index" 
                  class="flex items-start gap-4 opacity-0 translate-y-8" 
                  #liItem>
                <span class="text-[#A855F7] mt-1">✦</span>
                <span>{{ pillar }}</span>
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
export class PhilosophyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrapper') contentWrapper!: ElementRef;
  @ViewChild('heading') heading!: ElementRef;
  @ViewChildren('liItem') liItems!: QueryList<ElementRef>;

  public translationService = inject(TranslationService);
  translations = this.translationService.getTranslations('philosophy');

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
    
    // Ensure liItems are available
    const items = this.liItems?.toArray().map(item => item.nativeElement) || [];
    if (items.length > 0) {
      tl.to(items, {
        opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out"
      }, "0.6");
    }
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
