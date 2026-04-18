import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WritingTextComponent } from '../shared/writing-text.component';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, WritingTextComponent],
  template: `
    <section id="brand-statement" class="relative pt-24 pb-24 px-6 md:px-10 lg:px-0 bg-gradient-to-br from-[#0A0A1F] to-[#030303] overflow-hidden" [attr.dir]="translationService.currentDir()">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTQuNjI3IDU0LjYyN0w1MCA1OS4yNTRWMjBoMTEuMjU0TDYxLjI1NCAyMC43NDZMMTYuNzQ2IDY1LjI1NEg1LjQ5MkwwIDEwVjBioiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-[0.03] pointer-events-none"></div>

      <div class="max-w-[1400px] mx-auto flex flex-col relative z-10" #contentWrapper>
        
        <!-- Title -->
        <div class="mb-14">
          <h2 #titleElement class="font-space font-bold text-[42px] text-[#A855F7] tracking-tight m-0 inline-block opacity-0 translate-y-8">
            {{ translations().title }}
          </h2>
          <div #titleAccent class="w-10 h-[2px] bg-[#A855F7] mt-3 opacity-0"></div>
        </div>
        
        <!-- Text Content -->
        <div class="max-w-[750px]">
          <h3 class="font-readex font-light text-[28px] text-[#F8FAFC] leading-[1.4] max-w-[600px] mb-10">
            <app-writing-text [text]="translations().quote" [delay]="200"></app-writing-text>
          </h3>
          
          <p class="font-inter font-light text-[16px] text-[#CBD5E1] leading-[1.6] max-w-[550px] m-0">
            <app-writing-text [text]="translations().secondary" [delay]="400"></app-writing-text>
          </p>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrapper') contentWrapper!: ElementRef;
  @ViewChild('titleElement') titleElement!: ElementRef;
  @ViewChild('titleAccent') titleAccent!: ElementRef;

  public translationService = inject(TranslationService);
  translations = this.translationService.getTranslations('about');

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

    tl.to([this.titleElement.nativeElement, this.titleAccent.nativeElement], { 
      opacity: 1, y: 0, duration: 0.8, ease: "ease-out" 
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
