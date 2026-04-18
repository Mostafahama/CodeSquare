import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, inject, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero-text-generate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="text-generate" #textContainer>
      <span #generatedText></span>
    </p>
  `,
  styles: [`
    .text-generate {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 1.125rem;
      color: #CBD5E1;
      text-align: center;
      max-width: 600px;
      line-height: 1.6;
      margin-top: 1rem;
      opacity: 0;
    }
    
    .animate-in {
      animation: textGenerateBlur 2.5s cubic-bezier(0.33, 0.66, 0.66, 1) forwards;
    }

    @keyframes textGenerateBlur {
      0% {
        opacity: 0;
        filter: blur(8px);
        transform: translateY(10px);
      }
      50% {
        opacity: 0.7;
        filter: blur(3px);
      }
      100% {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
      }
    }
  `]
})
export class HeroTextGenerateComponent implements OnInit, OnDestroy {
  @ViewChild('generatedText', { static: true }) generatedTextElement!: ElementRef<HTMLElement>;
  @ViewChild('textContainer', { static: true }) textContainer!: ElementRef<HTMLElement>;
  
  public translationService = inject(TranslationService);
  private timer: any;

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      // Track language changes
      this.translationService.currentLang();
      // Safely re-animate
      untracked(() => this.resetAndAnimate());
    });
  }

  ngOnInit() {}

  private resetAndAnimate() {
    if (this.timer) clearInterval(this.timer);
    
    // Safety delay for detection cycle
    setTimeout(() => {
        if (this.generatedTextElement) {
            const el = this.generatedTextElement.nativeElement;
            this.textContainer.nativeElement.classList.remove('animate-in');
            el.textContent = '';
            
            // Re-trigger animation
            setTimeout(() => {
                this.animateText();
            }, 100);
        }
    }, 50);
  }

  private animateText() {
    const fullText = this.translationService.getTranslations('hero')()['sub'];
    this.textContainer.nativeElement.classList.add('animate-in');
    
    let displayed = '';
    const speed = 20; 
    let charIndex = 0;
    
    this.timer = setInterval(() => {
      if (charIndex < fullText.length) {
        displayed += fullText[charIndex];
        this.generatedTextElement.nativeElement.textContent = displayed;
        charIndex++;
      } else {
        clearInterval(this.timer);
        this.cdr.detectChanges();
      }
    }, speed);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
}
