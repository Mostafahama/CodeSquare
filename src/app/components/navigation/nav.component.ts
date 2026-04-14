import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Top-left standalone logo -->
    <div class="fixed top-8 left-8 z-[100] hidden md:block">
      <a class="font-readex font-light text-2xl text-white tracking-widest cursor-pointer" style="text-shadow: 0 0 20px rgba(168, 85, 247, 0.4);">
        CS<span class="text-lilac">.</span>
      </a>
    </div>

    <!-- Center Floating Pill Navigation -->
    <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto">
      <div class="nav-pill flex items-center justify-between md:justify-center p-2 bg-[#A855F7]/10 backdrop-blur-xl border border-[#A855F7]/30 shadow-[0_4px_30px_rgba(168,85,247,0.15)] rounded-full relative" (mouseleave)="hideHighlight()">
        
        <!-- Premium GSAP Sliding Highlight Blob -->
        <div #highlight class="sliding-highlight"></div>

        <ul class="flex items-center m-0 p-0 list-none w-full md:w-auto overflow-x-auto hide-scrollbar relative z-20">
          <li>
            <a (click)="active = 'home'; scrollTo('hero-container')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'home'">
               Home
            </a>
          </li>
          <li>
            <a (click)="active = 'about'; scrollTo('about-section')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'about'">
               About
            </a>
          </li>
          <li>
            <a (click)="active = 'services'; scrollTo('services-section')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'services'">
               Services
            </a>
          </li>
          <li>
            <a (click)="active = 'process'; scrollTo('process-section')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'process'">
               Process
            </a>
          </li>
          <li>
            <a (click)="active = 'contact'; scrollTo('consultation-form')" 
               (mouseenter)="moveHighlight($event)"
               class="nav-tab cursor-pointer"
               [class.active-tab]="active === 'contact'">
               Contact
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

    /* Essential CSS Performance properties for GSAP Slide */
    .sliding-highlight {
      position: absolute;
      top: 8px; /* Offset for padding */
      left: 0;
      height: calc(100% - 16px);
      background-color: rgba(168, 85, 247, 0.25);
      border-radius: 9999px;
      pointer-events: none;
      opacity: 0;
      z-index: 10;
      will-change: transform, width, opacity;
      transform-origin: left center;
      /* Notice NO CSS transitions here; GSAP handles everything for 60fps */
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
   @ViewChild('highlight', { static: true }) highlightRef!: ElementRef;
   active: string = 'home';

   moveHighlight(event: MouseEvent): void {
     const target = event.currentTarget as HTMLElement;
     // Retrieve positional data relative to the pill container
     const width = target.offsetWidth;
     const left = target.offsetLeft;

     gsap.to(this.highlightRef.nativeElement, {
       x: left,
       width: width,
       opacity: 1,
       duration: 0.4,
       ease: "back.out(1.2)",
       overwrite: true // Prevent animation conflicts
     });
   }

   hideHighlight(): void {
     gsap.to(this.highlightRef.nativeElement, {
       opacity: 0,
       duration: 0.3,
       ease: "power2.out",
       overwrite: true
     });
   }

   scrollTo(elementId: string): void {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
