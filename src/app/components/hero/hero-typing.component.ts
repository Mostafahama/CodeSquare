import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, inject, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero-typing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="typing-text m-0 relative" [attr.dir]="translationService.currentDir()">
      <span #typingText></span>
      <span class="typing-cursor" 
            [class.blinking]="isBlinking" 
            [class.rtl-cursor]="translationService.currentDir() === 'rtl'">
      </span>
    </h1>
  `,
  styles: [`
    .typing-text {
      font-family: 'Readex Pro', sans-serif;
      font-size: clamp(60px, 10vw, 140px);
      font-weight: 200;
      color: #F8FAFC;
      letter-spacing: -0.03em;
      line-height: 1.1;
      text-shadow: 
        0 0 15px rgba(168, 85, 247, 0.6),
        0 0 30px rgba(168, 85, 247, 0.4),
        0 0 60px rgba(168, 85, 247, 0.2);
      display: inline-flex;
      align-items: baseline;
    }
    
    .typing-cursor {
      display: inline-block;
      width: 4px;
      height: 0.85em;
      background-color: #A855F7;
      margin-inline-start: 4px; 
      vertical-align: text-bottom;
      animation: none;
    }
    
    .typing-cursor.blinking {
      animation: cursorBlink 0.9s infinite;
    }
    
    @keyframes cursorBlink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
  `]
})
export class HeroTypingComponent implements OnInit, OnDestroy {
  @ViewChild('typingText', { static: true }) typingTextElement!: ElementRef<HTMLElement>;
  
  public translationService = inject(TranslationService);

  isBlinking = false;
  private typingInterval: any;
  private readonly typingSpeed = 100;
  private currentIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      // Access the signal to track it
      this.translationService.currentLang();
      // Re-trigger typing safely
      untracked(() => this.resetAndType());
    });
  }

  ngOnInit() {}

  private resetAndType() {
    if (this.typingInterval) clearInterval(this.typingInterval);
    this.currentIndex = 0;
    
    // Use a small delay to ensure detection has finished before manual DOM update
    setTimeout(() => {
        if (this.typingTextElement) {
            this.typingTextElement.nativeElement.textContent = '';
            this.isBlinking = false;
            this.startTyping();
        }
    }, 50);
  }

  private startTyping() {
    const textToType = this.translationService.getTranslations('hero')()['welcome'];
    let displayedText = '';
    
    this.isBlinking = true; 
    setTimeout(() => {
        this.isBlinking = false;
        this.typingInterval = setInterval(() => {
            if (this.currentIndex < textToType.length) {
                displayedText += textToType[this.currentIndex];
                if (this.typingTextElement) {
                    this.typingTextElement.nativeElement.textContent = displayedText;
                }
                this.currentIndex++;
            } else {
                clearInterval(this.typingInterval);
                this.isBlinking = true;
                this.cdr.detectChanges();
            }
        }, this.typingSpeed);
    }, 300);
  }

  ngOnDestroy() {
    if (this.typingInterval) clearInterval(this.typingInterval);
  }
}
