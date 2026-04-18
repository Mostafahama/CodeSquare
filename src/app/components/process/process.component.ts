import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, OnDestroy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { gsap } from 'gsap';
import { TranslationService } from '../../services/translation.service';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationDirectionService } from '../../services/animation-direction.service';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="process-section" class="process-section pt-32 pb-32 px-8 relative overflow-hidden bg-[#030303] z-10" [attr.dir]="translationService.currentDir()">
      <div class="max-w-6xl mx-auto relative z-10">
        <h2 class="font-space font-bold text-4xl text-[#F8FAFC] tracking-tight mb-24 text-center">
          {{ translations().title }}
        </h2>

        <div class="timeline relative" #timelineContainer>
          <!-- Central Line Track -->
          <div class="absolute start-[20px] md:start-1/2 top-0 bottom-0 w-[2px] bg-[rgba(168,85,247,0.1)] -translate-x-1/2 md:rtl:translate-x-1/2"></div>
          
          <!-- Animated Fill Line -->
          <div class="absolute start-[20px] md:start-1/2 top-0 bottom-0 w-[2px] bg-[#A855F7] -translate-x-1/2 md:rtl:translate-x-1/2 origin-top scale-y-0 shadow-[0_0_15px_#A855F7]" #timelineFill></div>

          <div class="flex flex-col gap-12 md:gap-24">
            <div *ngFor="let step of translations().steps; let i = index" 
                 class="timeline-step relative flex w-full"
                 [ngClass]="{'md:flex-row-reverse': step.align === 'right', 'md:flex-row': step.align === 'left', 'flex-row': true}"
                 #stepElement>
                 
               <!-- Content Area Spacing -->
               <div class="w-[calc(50%-40px)] hidden md:block"></div>

               <!-- Node Circle -->
               <div class="absolute start-[20px] md:start-1/2 top-0 -translate-x-1/2 md:rtl:translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#030303] border-2 border-[#A855F7] z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)] node-circle">
                  <div class="w-3 h-3 rounded-full bg-[#EC4899] node-inner opacity-0 scale-0 transition-all duration-300"></div>
               </div>

               <!-- Actual Content Box -->
               <div class="content-box w-full md:w-[calc(50%-60px)] ps-16 md:ps-0 flex flex-col justify-start opacity-0 translate-y-12"
                    [ngClass]="{'md:text-end md:pe-12 md:items-end': step.align === 'left', 'md:text-start md:ps-12 items-start': step.align === 'right'}">
                  
                  <div class="text-[5rem] font-readex font-bold text-transparent opacity-30 leading-none outline-text pointer-events-none -mb-6 z-0 mix-blend-screen mix-blend-mode">
                      0{{ i + 1 }}
                  </div>
                  
                  <div class="relative z-10 p-6 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md hover:border-[#A855F7]/40 hover:-translate-y-2 transition-all duration-300 ease-out w-full">
                     <h3 class="font-space font-semibold text-2xl text-[#F8FAFC] mb-3">{{ step.title }}</h3>
                     <p class="font-inter font-light text-[#CBD5E1] text-base leading-relaxed whitespace-pre-line">{{ step.description }}</p>
                  </div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .outline-text {
      -webkit-text-stroke: 2px #A855F7;
      text-stroke: 2px #A855F7;
    }
    .node-circle.active {
      border-color: #EC4899;
      box-shadow: 0 0 25px rgba(236, 72, 153, 0.6);
    }
    .node-circle.active .node-inner {
      opacity: 1;
      transform: scale(1);
    }
  `]
})
export class ProcessComponent implements AfterViewInit, OnDestroy {
  @ViewChild('timelineContainer', { static: true }) timelineContainer!: ElementRef;
  @ViewChild('timelineFill', { static: true }) timelineFill!: ElementRef;
  @ViewChildren('stepElement') stepElements!: QueryList<ElementRef>;

  public translationService = inject(TranslationService);
  private animationDirection = inject(AnimationDirectionService);
  
  translations = this.translationService.getTranslations('process');

  constructor() {}

  async ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate central timeline drawing
    gsap.to(this.timelineFill.nativeElement, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: this.timelineContainer.nativeElement,
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: true
      }
    });

    // Animate each step box sliding in + lighting up the node
    this.stepElements.forEach((step, index) => {
      const el = step.nativeElement;
      const content = el.querySelector('.content-box');
      const node = el.querySelector('.node-circle');
      const stepData = this.translations().steps[index];

      // Initial state reset for GSAP to handle language toggle re-rendering
      gsap.set(content, { opacity: 0, y: 30, x: 0 });

      // Calculate direction-aware X offset
      // If step is aligned left, it slides from the left (negative X)
      // If step is aligned right, it slides from the right (positive X)
      // We then multiply by animationDirection.xMultiplier() to handle RTL inversion
      const baseOffsetX = stepData.align === 'left' ? -40 : 40;
      const finalX = this.animationDirection.getX(baseOffsetX);

      // Use fromTo to strictly define start and end states within a single ScrollTrigger to prevent engine conflict
      gsap.fromTo(content, 
        { opacity: 0, y: 30, x: finalX },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Activate node
      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        onEnter: () => node.classList.add('active'),
        onLeaveBack: () => node.classList.remove('active')
      });
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
