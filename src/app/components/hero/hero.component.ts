import { Component, OnDestroy, HostListener, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { HeroTypingComponent } from './hero-typing.component';
import { HeroTextGenerateComponent } from './hero-text-generate.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, HeroTypingComponent, HeroTextGenerateComponent],
  template: `
    <header id="hero-container" class="hero-container w-full h-screen relative bg-deep-black overflow-hidden flex items-center justify-center pt-20">
      
      <!-- Language Toggle inside Hero -->
      <div class="absolute top-24 end-6 md:top-8 md:end-10 z-[110] flex items-center gap-2 cursor-pointer group bg-[rgba(168,85,247,0.15)] hover:bg-[#A855F7] backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 border border-[rgba(168,85,247,0.3)] shadow-[0_0_15px_rgba(168,85,247,0.2)]" (click)="toggleLanguage()">
        <span class="font-inter font-bold text-[13px] text-white tracking-widest uppercase">
          {{ (translationService.currentLang() === 'en') ? 'عربي' : 'EN' }}
        </span>
      </div>

      <!-- Interactive Canvas String Wave Background -->
      <canvas #waveCanvas 
              class="absolute inset-0 w-full h-full z-[1] cursor-crosshair" 
              (mousemove)="onMouseMove($event)"
              (mousedown)="isPressed = true"
              (mouseup)="isPressed = false"
              (mouseleave)="isPressed = false">
      </canvas>

      <!-- Hero Content Overlay -->
      <div class="hero-content relative z-10 text-center flex flex-col items-center gap-2 pointer-events-none" style="transform: translateY(-5vh);">
        <app-hero-typing></app-hero-typing>
        <app-hero-text-generate></app-hero-text-generate>
      </div>

      <!-- Premium Wave Gradient Layer -->
      <div class="hero-gradient-wave absolute bottom-0 start-0 w-full h-1/5 pointer-events-none z-[5] opacity-90">
        <svg class="w-full h-full filter blur-[1px]" viewBox="0 0 1400 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" style="stop-color:#1E1B4B;stop-opacity:1" />
              <stop offset="30%" style="stop-color:#A855F7;stop-opacity:1" />
              <stop offset="70%" style="stop-color:#EC4899;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1E1B4B;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M0,150 Q350,50 700,150 T1400,150 L1400,300 L0,300 Z" fill="url(#waveGradient)" />
        </svg>
      </div>

      <!-- Glow Effect on Wave -->
      <div class="hero-wave-glow absolute bottom-[20%] start-0 w-full h-20 pointer-events-none z-[4]" 
           style="filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.4));">
      </div>

      <!-- Scroll Indicator Bouncing Down -->
      <div class="scroll-indicator absolute bottom-10 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-10 opacity-60">
        <svg class="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

    </header>
  `,
  styles: [`
    .hero-container {
      background: linear-gradient(135deg, #030303 0%, #1E1B4B 50%, #030303 100%);
    }

    .hero-content {
      animation: heroFadeIn 1.2s ease-out forwards;
    }

    @keyframes heroFadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hero-cta-btn {
      padding: 12px 32px;
      border: 2px solid #A855F7;
      background-color: transparent;
      color: #F8FAFC;
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .hero-cta-btn:hover {
      background-color: rgba(168, 85, 247, 0.1);
      border-color: #EC4899;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    }

    .hero-cta-btn:active {
      transform: scale(0.98);
    }

    .scroll-indicator {
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translate(-50%, 0); }
      50% { transform: translate(-50%, 10px); }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('waveCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  public translationService = inject(TranslationService);
  
  private ctx!: CanvasRenderingContext2D | null;
  private animationFrameId: number | null = null;
  private time = 0;
  
  // Mouse Interaction State
  protected mouseX = 0;
  protected mouseY = 0;
  protected targetMouseX = 0;
  protected targetMouseY = 0;
  protected isPressed = false;

  private linesCount = 120; 

  ngAfterViewInit(): void {
    if (this.canvasRef) {
      this.ctx = this.canvasRef.nativeElement.getContext('2d');
      this.resizeCanvas();
      
      this.mouseX = window.innerWidth / 2;
      this.mouseY = window.innerHeight * 0.75;
      this.targetMouseX = this.mouseX;
      this.targetMouseY = this.mouseY;

      this.animateWaves();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.resizeCanvas();
  }

  public onMouseMove(event: MouseEvent): void {
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
        const rect = canvas.getBoundingClientRect();
        this.targetMouseX = event.clientX - rect.left;
        this.targetMouseY = event.clientY - rect.top;
    }
  }

  private resizeCanvas(): void {
    if (this.canvasRef && this.ctx) {
      this.canvasRef.nativeElement.width = window.innerWidth;
      this.canvasRef.nativeElement.height = window.innerHeight;
    }
  }

  private animateWaves = () => {
    if (!this.ctx || !this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;

    this.mouseX += (this.targetMouseX - this.mouseX) * 0.1;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.1;

    // Clear background to be completely transparent so the CSS gradient background shows
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.globalCompositeOperation = 'screen';
    
    const gradient = this.ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(147, 197, 253, 0.4)'); // Light Blue
    gradient.addColorStop(0.5, 'rgba(216, 180, 226, 0.4)'); // Soft Lilac
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.4)'); // Deep Purple

    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 1.0;

    const pullRadius = this.isPressed ? 350 : 250;
    const pullStrength = this.isPressed ? 0.9 : 0.4;
    const baseY = height * 0.75; 
    
    for (let i = 0; i < this.linesCount; i++) {
       this.ctx.beginPath();
       const percent = i / this.linesCount;
       
       for (let x = 0; x <= width; x += 15) {
          const nx = x / width;
          
          const wave1 = Math.sin(nx * 3.5 + this.time * 0.0012 + i * 0.05) * 45;
          const wave2 = Math.cos(nx * 7.0 - this.time * 0.0008 + i * 0.02) * 25;
          const wave3 = Math.sin(nx * 15.0 + this.time * 0.002) * 15 * percent;
          
          const spread = (percent - 0.5) * 50; 
          let y = baseY + wave1 + wave2 + wave3 + spread;
          
          const dx = x - this.mouseX;
          const dy = y - this.mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < pullRadius) {
             const influence = Math.pow(1 - (dist / pullRadius), 2);
             y -= dy * influence * pullStrength * (0.5 + percent * 0.8);
          }
          
          if (x === 0) {
            this.ctx.moveTo(x, y);
          } else {
            this.ctx.lineTo(x, y);
          }
       }
       this.ctx.stroke();
    }
    
    this.ctx.globalCompositeOperation = 'source-over';
    this.time += 16;
    this.animationFrameId = requestAnimationFrame(this.animateWaves);
  }

  scrollToWork(): void {
    const el = document.getElementById('projects-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
