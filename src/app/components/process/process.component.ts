import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  align: 'left' | 'right';
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="process-section" class="process-section pt-32 pb-32 px-8 relative overflow-hidden bg-[#030303] z-10">
      <div class="max-w-6xl mx-auto relative z-10">
        <h2 class="font-space font-bold text-4xl text-[#F8FAFC] tracking-tight mb-24 text-center">Our Methodology</h2>

        <div class="timeline relative" #timelineContainer>
          <!-- Central Line Track -->
          <div class="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(168,85,247,0.1)] -translate-x-1/2"></div>
          
          <!-- Animated Fill Line -->
          <div class="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#A855F7] -translate-x-1/2 origin-top scale-y-0 shadow-[0_0_15px_#A855F7]" #timelineFill></div>

          <div class="flex flex-col gap-12 md:gap-24">
            <div *ngFor="let step of steps; let i = index" 
                 class="timeline-step relative flex w-full"
                 [ngClass]="{'md:flex-row-reverse': step.align === 'right', 'md:flex-row': step.align === 'left', 'flex-row': true}"
                 #stepElement>
                 
               <!-- Content Area -->
               <div class="w-[calc(50%-40px)] hidden md:block"></div>

               <!-- Node Circle -->
               <div class="absolute left-[20px] md:left-1/2 top-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#030303] border-2 border-[#A855F7] z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)] node-circle">
                  <div class="w-3 h-3 rounded-full bg-[#EC4899] node-inner opacity-0 scale-0 transition-all duration-300"></div>
               </div>

               <!-- Actual Content Box -->
               <div class="content-box w-full md:w-[calc(50%-60px)] pl-16 md:pl-0 flex flex-col justify-start opacity-0 translate-y-12"
                    [ngClass]="{'md:text-right md:pr-12 md:items-end': step.align === 'left', 'md:text-left md:pl-12 items-start': step.align === 'right'}">
                  
                  <div class="text-[5rem] font-readex font-bold text-transparent opacity-30 leading-none outline-text pointer-events-none -mb-6 z-0 mix-blend-screen mix-blend-mode">
                    0{{ step.number }}
                  </div>
                  
                  <div class="relative z-10 p-6 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md hover:border-[#A855F7]/40 hover:-translate-y-2 transition-all duration-300 ease-out w-full">
                     <h3 class="font-space font-semibold text-2xl text-[#F8FAFC] mb-3">{{ step.title }}</h3>
                     <p class="font-inter font-light text-[#CBD5E1] text-base leading-relaxed">{{ step.description }}</p>
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
export class ProcessComponent implements AfterViewInit {
  @ViewChild('timelineContainer') timelineContainer!: ElementRef;
  @ViewChild('timelineFill') timelineFill!: ElementRef;
  @ViewChildren('stepElement') stepElements!: QueryList<ElementRef>;

  steps: ProcessStep[] = [
    {
      number: 1,
      title: 'Foundation',
      description: 'Strategic discovery to understand vision, goals, and technical requirements mapping.',
      align: 'left'
    },
    {
      number: 2,
      title: 'Architecture',
      description: 'Designing robust blueprints tailored to scale and perform flawlessly under load.',
      align: 'right'
    },
    {
      number: 3,
      title: 'Engineering',
      description: 'Building with precision, leveraging modern frameworks and industry-standard best practices.',
      align: 'left'
    },
    {
      number: 4,
      title: 'Launch & Iterate',
      description: 'Seamless deployment pipelines followed by continuous optimization loops.',
      align: 'right'
    }
  ];

  constructor(private scrollAnimation: ScrollAnimationService) {}

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

      // Slide and fade in contents
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // Activate node
      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%', // when node hits middle of screen, track hits it
        onEnter: () => node.classList.add('active'),
        onLeaveBack: () => node.classList.remove('active')
      });
    });
  }
}
