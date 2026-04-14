import { 
  Component, 
  ElementRef, 
  AfterViewInit, 
  OnDestroy, 
  input,
  NgZone,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-writing-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="writing-container" [class.is-ready]="isReady">
      @for (word of words; track $index) {
        <span class="word-span">
          {{ word }}{{ ' ' }}
        </span>
      }
    </div>
  `,
  styles: [`
    .writing-container {
      display: inline-block;
      width: 100%;
      min-height: 1.2em; /* Ensure it's never 0 height */
    }
    
    .word-span {
      display: inline-block;
      white-space: pre-wrap;
      
      /* START STATE: Fully visible by default! 
         This is "Fail-Safe". If JS fails, text is visible. */
      opacity: 1;
      transform: translateY(0);
      
      will-change: transform, opacity;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      font-weight: inherit;
      line-height: inherit;
    }
  `]
})
export class WritingTextComponent implements AfterViewInit, OnDestroy {
  text = input.required<string>();
  delay = input<number>(0);
  
  // Optional: allows parent to re-trigger or delay start
  trigger = input<boolean>(true);

  isReady = false;
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  constructor(
    private el: ElementRef, 
    private ngZone: NgZone
  ) {
    // Watch for trigger changes if needed
    effect(() => {
      if (this.trigger() && this.isReady && !this.hasAnimated) {
        // We could trigger here, but IntersectionObserver is better for performance
      }
    });
  }

  get words(): string[] {
    const textVal = this.text();
    return textVal ? textVal.split(' ') : [];
  }

  ngAfterViewInit() {
    this.isReady = true;
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  private setupIntersectionObserver() {
    // If we've already animated or trigger is false, skip
    if (this.hasAnimated) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Firing when 10% visible
        if (entry.isIntersecting && !this.hasAnimated && this.trigger()) {
          this.hasAnimated = true;
          this.runAnimation();
          this.observer?.disconnect();
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before it's fully in view
    });

    this.observer.observe(this.el.nativeElement);
  }

  private runAnimation() {
    this.ngZone.runOutsideAngular(() => {
      // Small timeout to ensure Angular has finished any pending renders
      setTimeout(() => {
        const elements = this.el.nativeElement.querySelectorAll('.word-span');
        
        if (elements && elements.length > 0) {
          // Use .from() to animate FROM hidden TO the default (visible) state
          // This way, if the animation fails to start, the elements remain visible.
          gsap.from(elements, {
            opacity: 0,
            y: 15,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out',
            delay: this.delay() / 1000,
            clearProps: 'all' // Clean up after animation
          });
        }
      }, 50);
    });
  }
}
