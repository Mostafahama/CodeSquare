import { 
  Component, 
  ElementRef, 
  AfterViewInit, 
  OnDestroy, 
  input,
  NgZone,
  inject,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  untracked,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-writing-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="writing-container" [attr.dir]="translationService.currentDir()">
      @for (word of words(); track $index) {
        <span class="word-span">
          <span class="word-content">{{ word }}</span>{{ ' ' }}
        </span>
      }
    </div>
  `,
  styles: [`
    .writing-container {
      display: inline-block;
      width: 100%;
      min-height: 1.2em;
    }
    
    .word-span {
      display: inline-block;
      white-space: pre-wrap;
      opacity: 0;
      transform: translateY(15px);
      will-change: transform, opacity;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      font-weight: inherit;
      line-height: inherit;
    }

    .word-content {
      unicode-bidi: isolate; 
    }
  `]
})
export class WritingTextComponent implements AfterViewInit, OnDestroy, OnChanges {
  text = input.required<string>();
  delay = input<number>(0);
  trigger = input<boolean>(true);

  public translationService = inject(TranslationService);
  
  words = computed(() => {
    const textVal = this.text();
    return textVal ? textVal.split(' ') : [];
  });

  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;
  private animationTl: gsap.core.Timeline | null = null;

  constructor(
    private el: ElementRef, 
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // If text changes after initial render, re-trigger
    if (changes['text'] && !changes['text'].firstChange) {
      this.resetAndReanimate();
    }
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private resetAndReanimate() {
    this.hasAnimated = false;
    
    this.ngZone.runOutsideAngular(() => {
        // Kill existing animation
        if (this.animationTl) {
          this.animationTl.kill();
        }
        
        // Brief delay before re-scanning DOM for new @for elements
        setTimeout(() => {
            const elements = this.el.nativeElement.querySelectorAll('.word-span');
            gsap.set(elements, { opacity: 0, y: 15 });
            this.setupIntersectionObserver();
        }, 10);
    });
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
    if (this.animationTl) this.animationTl.kill();
  }

  private setupIntersectionObserver() {
    if (this.hasAnimated) return;
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated && this.trigger()) {
          this.hasAnimated = true;
          this.runAnimation();
          this.observer?.disconnect();
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.observer.observe(this.el.nativeElement);
  }

  private runAnimation() {
    this.ngZone.runOutsideAngular(() => {
      // Small timeout to ensure Angular finished rendering the new words
      setTimeout(() => {
        const elements = this.el.nativeElement.querySelectorAll('.word-span');
        
        if (elements && elements.length > 0) {
          this.animationTl = gsap.timeline();
          this.animationTl.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out',
            delay: this.delay() / 1000
          });
        }
      }, 50);
    });
  }
}
