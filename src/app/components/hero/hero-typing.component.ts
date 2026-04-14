import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-typing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="typing-text m-0 relative">
      <span #typingText></span>
      <span class="typing-cursor" [class.blinking]="isBlinking"></span>
    </h1>
  `,
  styles: [`
    .typing-text {
      font-family: 'Readex Pro', sans-serif;
      font-size: clamp(100px, 15vw, 220px);
      font-weight: 200;
      color: #F8FAFC;
      letter-spacing: -0.03em;
      line-height: 1.1;
      text-shadow: 
        0 0 15px rgba(168, 85, 247, 0.6),
        0 0 30px rgba(168, 85, 247, 0.4),
        0 0 60px rgba(168, 85, 247, 0.2);
    }
    
    .typing-cursor {
      display: inline-block;
      width: 4px;
      height: 0.85em;
      background-color: #A855F7;
      margin-left: 2px;
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
  
  isBlinking = false;
  private typingInterval: any;
  private readonly textToType = 'Code Square';
  private readonly typingSpeed = 120; // ms per char
  private currentIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startTyping();
  }

  private startTyping() {
    let displayedText = '';
    
    // Slight initial delay before typing starts to look natural
    setTimeout(() => {
        this.isBlinking = true; // start blinking cursor before typing begins
        setTimeout(() => {
            this.isBlinking = false; // stop blinking while typing
            this.typingInterval = setInterval(() => {
            if (this.currentIndex < this.textToType.length) {
            displayedText += this.textToType[this.currentIndex];
            this.typingTextElement.nativeElement.textContent = displayedText;
            this.currentIndex++;
        } else {
            clearInterval(this.typingInterval);
            this.isBlinking = true;
            this.cdr.detectChanges();
        }
        }, this.typingSpeed);
        }, 200); // 200ms delay after cursor appears before typing
    }, 400); 
  }

  ngOnDestroy() {
    if (this.typingInterval) clearInterval(this.typingInterval);
  }
}
