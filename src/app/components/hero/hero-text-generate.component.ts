import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-text-generate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="text-generate">
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
        filter: blur(0.8px);
        transform: translateY(10px);
      }
      50% {
        opacity: 0.7;
        filter: blur(0.3px);
      }
      100% {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
      }
    }
  `]
})
export class HeroTextGenerateComponent implements OnInit {
  @ViewChild('generatedText', { static: true }) generatedTextElement!: ElementRef<HTMLElement>;
  private readonly text = 'We turn complex ideas into effortless digital experiences';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Delay corresponding to typing effect finishing + slight pause (400ms delay + 1320ms typing + 500ms delay)
    setTimeout(() => this.animateText(), 2220); 
  }

  private animateText() {
    this.generatedTextElement.nativeElement.parentElement?.classList.add('animate-in');
    
    let displayed = '';
    const speed = 30; // 30ms per character
    const interval = setInterval(() => {
      if (displayed.length < this.text.length) {
        displayed += this.text[displayed.length];
        this.generatedTextElement.nativeElement.textContent = displayed;
      } else {
        clearInterval(interval);
      }
    }, speed);
  }
}
