import { Component, ElementRef, ViewChild, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Top-start standalone logo -->
    <div class="fixed top-8 start-8 z-[100] hidden md:block">
      <a class="font-readex font-light text-2xl text-white tracking-widest cursor-pointer" style="text-shadow: 0 0 20px rgba(168, 85, 247, 0.4);">
        CS<span class="text-lilac">.</span>
      </a>
    </div>



    <!-- Center Floating Pill Navigation -->
    <nav class="fixed top-6 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-[100] w-[90%] md:w-auto overflow-visible" [attr.dir]="translationService.currentDir()">
      <div class="nav-pill flex items-center justify-between md:justify-center p-2 bg-[#A855F7]/10 backdrop-blur-xl border border-[#A855F7]/30 shadow-[0_4px_30px_rgba(168,85,247,0.15)] rounded-full relative" (mouseleave)="hideHighlight()">
        
        <!-- Premium GSAP Sliding Highlight Blob -->
        <div #highlight class="sliding-highlight"></div>

        <ul class="flex items-center m-0 p-0 list-none w-full md:w-auto overflow-x-auto hide-scrollbar relative z-20">
          <li>
            <a (click)="active = 'home'; scrollTo('hero-container')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'home'">
               {{ translations().home }}
            </a>
          </li>
          <li>
            <a (click)="active = 'about'; scrollTo('brand-statement')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'about'">
               {{ translations().about }}
            </a>
          </li>
          <li>
            <a (click)="active = 'services'; scrollTo('services-section')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'services'">
               {{ translations().services }}
            </a>
          </li>
          <li>
            <a (click)="active = 'work'; scrollTo('projects-section')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'work'">
               {{ translations().work }}
            </a>
          </li>
          <li>
            <a (click)="active = 'process'; scrollTo('process-section')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'process'">
               {{ processLabel() }}
            </a>
          </li>
        </ul>

      </div>
    </nav>
  `,
  styles: [`
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .sliding-highlight {
      position: absolute;
      top: 8px;
      inset-inline-start: 0;
      height: calc(100% - 16px);
      background-color: rgba(168, 85, 247, 0.25);
      border-radius: 9999px;
      pointer-events: none;
      opacity: 0;
      z-index: 10;
      will-change: transform, width, opacity;
      transform-origin: center center;
    }

    .nav-tab {
      display: block;
      padding: 10px 24px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 0.9rem;
      color: #E2CBF8;
      border-radius: 9999px;
      transition: color 0.3s cubic-bezier(0.23, 1, 0.320, 1), background-color 0.3s ease;
      white-space: nowrap;
      position: relative;
    }

    .nav-tab:hover {
      color: #FFFFFF;
      text-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
    }

    .active-tab {
      background-color: #A855F7;
      color: #FFFFFF;
      box-shadow: inset 0 1px 1px rgba(255,255,255,0.2), 0 0 15px rgba(168, 85, 247, 0.6);
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
  `]
})
export class NavComponent {
   public translationService = inject(TranslationService);
   @ViewChild('highlight', { static: true }) highlightRef!: ElementRef;
   active: string = 'home';

   translations = this.translationService.getTranslations('nav');
   
   // Direct mapping for process label to ensure it's reactive and clean
   processLabel = computed(() => {
     const lang = this.translationService.currentLang();
     return lang === 'ar' ? this.translationService.getTranslations('process')().title : 'Process';
   });

   moveHighlight(event: MouseEvent): void {
     const target = event.currentTarget as HTMLElement;
     const width = target.offsetWidth;
     
     // In RTL, we calculate offset from the right edge
     const isRtl = this.translationService.currentDir() === 'rtl';
     const parentWidth = target.parentElement?.parentElement?.offsetWidth || 0;
     
     // Get logical "start" offset
     let startOffset = target.offsetLeft;
     
     if (isRtl) {
       // In many browsers, offsetLeft in RTL is still from left
       // We need to mirror it for GSAP x
       startOffset = (parentWidth - target.offsetLeft - width);
       gsap.to(this.highlightRef.nativeElement, {
         x: -startOffset, // Move left relative to right start
         width: width,
         opacity: 1,
         duration: 0.4,
         ease: "back.out(1.2)",
         overwrite: true 
       });
     } else {
       gsap.to(this.highlightRef.nativeElement, {
         x: startOffset,
         width: width,
         opacity: 1,
         duration: 0.4,
         ease: "back.out(1.2)",
         overwrite: true 
       });
     }
   }

   hideHighlight(): void {
     gsap.to(this.highlightRef.nativeElement, {
       opacity: 0,
       duration: 0.3,
       ease: "power2.out",
       overwrite: true
     });
   }

   toggleLanguage() {
     this.translationService.toggleLanguage();
   }

   scrollTo(elementId: string): void {
     const el = document.getElementById(elementId);
     if (el) {
       el.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
   }
}
