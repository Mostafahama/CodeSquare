import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WritingTextComponent } from '../shared/writing-text.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, WritingTextComponent],
  template: `
    <section id="brand-statement" class="relative pt-24 pb-24 px-6 md:px-10 lg:px-0 bg-gradient-to-br from-[#0A0A1F] to-[#030303] overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQuNjI3IDU0LjYyN0w1MCA1OS4yNTRWMjBoMTEuMjU0TDYxLjI1NCAyMC43NDZMMTYuNzQ2IDY1LjI1NEg1LjQ5MkwwIDEwVjBioiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-[0.03] pointer-events-none"></div>

      <div class="max-w-[1400px] mx-auto flex flex-col lg:flex-row relative z-10" #contentWrapper>
        
        <!-- Left Text Content (60%) -->
        <div class="w-full lg:w-[60%] lg:pr-16 mb-16 lg:mb-0">
          <div class="mb-14">
            <h2 #titleElement class="font-space font-bold text-[42px] text-[#A855F7] tracking-tight m-0 inline-block opacity-0 translate-y-8">
              Who We Are
            </h2>
            <div #titleAccent class="w-10 h-[2px] bg-[#A855F7] mt-3 opacity-0"></div>
          </div>
          
          <h3 class="font-readex font-light text-[28px] text-[#F8FAFC] leading-[1.4] max-w-[600px] mb-10">
            <app-writing-text [text]="quoteText" [delay]="200"></app-writing-text>
          </h3>
          
          <p class="font-inter font-light text-[16px] text-[#CBD5E1] leading-[1.6] max-w-[550px] m-0">
            <app-writing-text [text]="secondaryText" [delay]="400"></app-writing-text>
          </p>
        </div>

        <!-- Vertical Separator -->
        <div #separatorLine class="hidden lg:block w-[2px] bg-[#A855F7] opacity-40 origin-top scale-y-0 transition-opacity duration-300 hover:opacity-100 glow-on-hover"></div>
        <div #separatorLineMobile class="block lg:hidden w-full h-[2px] bg-[#A855F7] opacity-40 origin-left scale-x-0 mb-10"></div>

        <!-- Right Stats Display (40%) -->
        <div class="w-full lg:w-[40%] lg:pl-10 flex flex-col md:flex-row lg:flex-col gap-10" #metricsElement>
          <div class="metric-card group">
            <h4 class="font-space font-bold text-5xl text-[#A855F7] group-hover:text-[#EC4899] transition-colors duration-300 m-0 leading-none">
              <span #stat1>0</span>+
            </h4>
            <div class="w-5 h-[1px] bg-[rgba(168,85,247,0.2)] my-3 transition-colors duration-300 group-hover:bg-[#EC4899]/50"></div>
            <p class="font-inter font-medium text-[12px] uppercase tracking-wider text-[#CBD5E1] m-0">Projects Delivered</p>
          </div>
          <div class="metric-card group">
            <h4 class="font-space font-bold text-5xl text-[#A855F7] group-hover:text-[#EC4899] transition-colors duration-300 m-0 leading-none">
              <span #stat2>0</span>%
            </h4>
            <div class="w-5 h-[1px] bg-[rgba(168,85,247,0.2)] my-3 transition-colors duration-300 group-hover:bg-[#EC4899]/50"></div>
            <p class="font-inter font-medium text-[12px] uppercase tracking-wider text-[#CBD5E1] m-0">Client Retention</p>
          </div>
          <div class="metric-card group">
            <h4 class="font-space font-bold text-5xl text-[#A855F7] group-hover:text-[#EC4899] transition-colors duration-300 m-0 leading-none">
              <span #stat3>0</span>
            </h4>
            <div class="w-5 h-[1px] bg-[rgba(168,85,247,0.2)] my-3 transition-colors duration-300 group-hover:bg-[#EC4899]/50"></div>
            <p class="font-inter font-medium text-[12px] uppercase tracking-wider text-[#CBD5E1] m-0">Compromises</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .glow-on-hover:hover {
      box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
    }
    .metric-card { cursor: default; }
  `]
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('contentWrapper') contentWrapper!: ElementRef;
  @ViewChild('titleElement') titleElement!: ElementRef;
  @ViewChild('titleAccent') titleAccent!: ElementRef;
  @ViewChild('metricsElement') metricsElement!: ElementRef;
  @ViewChild('separatorLine') separatorLine!: ElementRef;
  @ViewChild('separatorLineMobile') separatorLineMobile!: ElementRef;
  @ViewChild('stat1') stat1!: ElementRef;
  @ViewChild('stat2') stat2!: ElementRef;
  @ViewChild('stat3') stat3!: ElementRef;

  // Text as component properties — avoids template escaping issues
  quoteText = "We don't just build software… we architect scalable solutions that redefine industries.";
  secondaryText = 'Our team of elite engineers and designers craft digital experiences that leave a lasting impact.';

  private hasAnimated = false;

  async ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    const isDesktop = window.innerWidth > 1024;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateSection(isDesktop);
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(this.contentWrapper.nativeElement);
  }

  private animateSection(isDesktop: boolean) {
    const tl = gsap.timeline();

    tl.to([this.titleElement.nativeElement, this.titleAccent.nativeElement], { 
      opacity: 1, y: 0, duration: 0.8, ease: "ease-out" 
    });

    if (isDesktop) {
      tl.to(this.separatorLine.nativeElement, { scaleY: 1, duration: 0.8, ease: "ease-out" }, "0.6");
    } else {
      tl.to(this.separatorLineMobile.nativeElement, { scaleX: 1, duration: 0.8, ease: "ease-out" }, "0.6");
    }

    tl.fromTo(this.metricsElement.nativeElement.children, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "ease-out" }, 
      "0.7"
    );

    const stat1Obj = { val: 0 };
    const stat2Obj = { val: 0 };
    const stat3Obj = { val: 0 };

    setTimeout(() => {
      gsap.to(stat1Obj, {
        val: 100, duration: 2.0, ease: "elastic.out(1, 0.5)",
        onUpdate: () => { this.stat1.nativeElement.innerText = Math.round(stat1Obj.val).toString(); }
      });
      gsap.to(stat2Obj, {
        val: 98, duration: 2.0, ease: "elastic.out(1, 0.5)", delay: 0.1,
        onUpdate: () => { this.stat2.nativeElement.innerText = Math.round(stat2Obj.val).toString(); }
      });
      gsap.to(stat3Obj, {
        val: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.2,
        onUpdate: () => { this.stat3.nativeElement.innerText = Math.round(stat3Obj.val).toString(); }
      });
    }, 700);
  }
}
