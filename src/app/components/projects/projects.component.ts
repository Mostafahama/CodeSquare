import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, QueryList, ViewChildren, ViewEncapsulation, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WritingTextComponent } from '../shared/writing-text.component';
import { TranslationService } from '../../services/translation.service';

interface Project {
  number: string;
  title: string;
  status: string;
  statusClass: string;
  type: string;
  description: string;
  techStack: string[];
  gradient: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, WritingTextComponent],
  template: `
    <section id="projects-section" class="projects-section" #projectsSection [attr.dir]="translationService.currentDir()">

      <!-- Section Header -->
      <div class="section-header" #sectionHeader>
        <h2 class="section-title">{{ translations().title }}</h2>
        <p class="section-subtitle">
          <app-writing-text [text]="translations().subtitle" [delay]="200"></app-writing-text>
        </p>
        <div class="decorative-line" #decorLine></div>
      </div>

      <!-- Stacked Panels Container -->
      <div class="stack-container" #stackContainer>
        <div
          *ngFor="let project of projects(); let i = index; let last = last"
          class="project-panel"
          [style.--panel-gradient]="project.gradient"
          [attr.data-index]="i"
          #projectPanel>

          <div class="panel-inner">
            <!-- Left: Counter -->
            <div class="panel-counter">
              <span class="counter-num">{{ project.number }}</span>
              <span class="counter-total">/{{ totalStr }}</span>
            </div>

            <!-- Right: Content -->
            <div class="panel-content">
              <div class="panel-meta">
                <span class="panel-type">{{ project.type }}</span>
                <span class="panel-status" [ngClass]="project.statusClass">{{ project.status }}</span>
              </div>

              <h3 class="panel-title">{{ project.title }}</h3>
              <p class="panel-description">{{ project.description }}</p>

              <div class="panel-tech">
                <span class="tech-pill" *ngFor="let tech of project.techStack">{{ tech }}</span>
              </div>

              <button class="panel-cta" [attr.aria-label]="'View case study for ' + project.title">
                <span>{{ (translationService.currentLang() === 'ar') ? 'عرض دراسة الحالة' : 'View Case Study' }}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="rtl:rotate-180">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Subtle bottom shadow when stacked -->
          <div class="panel-shadow" *ngIf="!last"></div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    /* ══════════════════════════════════════════════════ */
    /*  Section                                           */
    /* ══════════════════════════════════════════════════ */
    .projects-section {
      position: relative;
      background: #030303;
      padding-top: 120px;
      padding-bottom: 80px;
    }

    /* ══════════════════════════════════════════════════ */
    /*  Header                                            */
    /* ══════════════════════════════════════════════════ */
    .section-header {
      text-align: center;
      margin-bottom: 40px;
      padding: 0 40px;
    }
    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: clamp(32px, 5vw, 48px);
      color: #F8FAFC;
      margin: 0 0 20px;
      letter-spacing: -0.02em;
    }
    .section-subtitle {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 16px;
      color: #CBD5E1;
      margin: 0 0 30px;
    }
    .decorative-line {
      width: 0;
      height: 2px;
      margin: 0 auto;
      background: linear-gradient(90deg, #A855F7, #EC4899);
      border-radius: 1px;
    }

    /* ══════════════════════════════════════════════════ */
    /*  Stack Container                                   */
    /* ══════════════════════════════════════════════════ */
    .stack-container {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* ══════════════════════════════════════════════════ */
    /*  Individual Panel                                  */
    /* ══════════════════════════════════════════════════ */
    .project-panel {
      position: sticky;
      top: 120px;
      margin-bottom: 80px;
      will-change: transform, opacity, filter;
      transform-origin: center top;
    }
    
    .project-panel:last-child {
      margin-bottom: 0;
    }

    .panel-inner {
      display: flex;
      align-items: stretch;
      gap: 0;
      min-height: 400px;
      background: var(--panel-gradient);
      border: 1px solid rgba(168, 85, 247, 0.12);
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .panel-inner::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(168, 85, 247, 0.04) 0%, transparent 50%);
      pointer-events: none;
    }

    .panel-shadow {
      position: absolute;
      bottom: -15px;
      left: 3%;
      right: 3%;
      height: 30px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 20px 20px;
      filter: blur(15px);
      z-index: -1;
    }

    /* ══════════════════════════════════════════════════ */
    /*  Counter (Left)                                    */
    /* ══════════════════════════════════════════════════ */
    .panel-counter {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 220px;
      min-width: 220px;
      padding: 48px 24px;
      border-right: 1px solid rgba(168, 85, 247, 0.1);
      position: relative;
      background: rgba(0, 0, 0, 0.2);
    }
    .rtl .panel-counter {
      border-right: none;
      border-left: 1px solid rgba(168, 85, 247, 0.1);
    }
    .panel-counter::after {
      content: '';
      position: absolute;
      top: 20%;
      bottom: 20%;
      right: -1px;
      width: 1px;
      background: linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.3), transparent);
    }
    .rtl .panel-counter::after {
      right: auto;
      left: -1px;
    }

    .counter-num {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: clamp(64px, 8vw, 110px);
      color: rgba(168, 85, 247, 0.18);
      line-height: 1;
      letter-spacing: -0.04em;
    }
    .counter-total {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 16px;
      color: rgba(168, 85, 247, 0.4);
      margin-top: 8px;
      letter-spacing: 0.1em;
    }

    /* ══════════════════════════════════════════════════ */
    /*  Content (Right)                                   */
    /* ══════════════════════════════════════════════════ */
    .panel-content {
      flex: 1;
      padding: 56px 64px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .panel-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    .panel-type {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 14px;
      color: #94A3B8;
      letter-spacing: 0.03em;
    }
    .panel-status {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 5px 14px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .status-live {
      background: rgba(34, 197, 94, 0.12);
      border: 1px solid rgba(34, 197, 94, 0.25);
      color: #22C55E;
    }
    .status-progress {
      background: rgba(168, 85, 247, 0.12);
      border: 1px solid rgba(168, 85, 247, 0.25);
      color: #A855F7;
    }
    .status-idea {
      background: rgba(234, 179, 8, 0.1);
      border: 1px solid rgba(234, 179, 8, 0.2);
      color: #EAB308;
    }
    .status-updating {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.2);
      color: #3B82F6;
    }

    .panel-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: clamp(28px, 4vw, 36px);
      color: #F8FAFC;
      margin: 0 0 20px;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }
    .panel-description {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 16px;
      color: #CBD5E1;
      line-height: 1.7;
      margin: 0 0 32px;
      max-width: 600px;
    }

    /* ══════════════════════════════════════════════════ */
    /*  Tech Pills                                        */
    /* ══════════════════════════════════════════════════ */
    .panel-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 40px;
    }
    .tech-pill {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 13px;
      padding: 6px 16px;
      border-radius: 20px;
      background: rgba(168, 85, 247, 0.08);
      border: 1px solid rgba(168, 85, 247, 0.2);
      color: #C084FC;
      transition: all 0.3s ease;
    }
    .tech-pill:hover {
      background: rgba(168, 85, 247, 0.15);
      border-color: rgba(168, 85, 247, 0.4);
      transform: translateY(-2px);
    }

    /* ══════════════════════════════════════════════════ */
    /*  CTA Button                                        */
    /* ══════════════════════════════════════════════════ */
    .panel-cta {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 15px;
      color: #A855F7;
      background: transparent;
      border: 1px solid rgba(168, 85, 247, 0.3);
      border-radius: 8px;
      padding: 14px 28px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      align-self: flex-start;
    }
    .panel-cta:hover {
      background: rgba(168, 85, 247, 0.1);
      border-color: #A855F7;
      color: #D8B4FE;
      transform: translateX(4px);
      box-shadow: 0 0 25px rgba(168, 85, 247, 0.15);
    }
    .panel-cta svg {
      transition: transform 0.3s ease;
    }
    .panel-cta:hover svg {
      transform: translateX(4px);
    }
    .rtl .panel-cta:hover {
      transform: translateX(-4px);
    }
    .rtl .panel-cta:hover svg {
      transform: translateX(-4px) rotate(180deg);
    }

    /* ══════════════════════════════════════════════════ */
    /*  Responsive                                        */
    /* ══════════════════════════════════════════════════ */
    @media (max-width: 900px) {
      .panel-counter {
        width: 140px;
        min-width: 140px;
        padding: 32px 16px;
      }
      .counter-num { font-size: 60px; }
      .panel-content { padding: 40px 32px; }
      .panel-title { font-size: 26px; }
    }

    @media (max-width: 640px) {
      .projects-section { padding-top: 80px; }
      .section-header { margin-bottom: 50px; padding: 0 20px; }
      
      .panel-inner {
        flex-direction: column;
        min-height: auto;
      }
      .panel-counter {
        width: 100%;
        min-width: 100%;
        flex-direction: row;
        gap: 12px;
        padding: 24px;
        border-right: none;
        border-bottom: 1px solid rgba(168, 85, 247, 0.1);
        justify-content: flex-start;
        align-items: baseline;
      }
      .rtl .panel-counter {
        border-left: none;
      }
      .panel-counter::after { display: none; }
      .counter-num { font-size: 48px; }
      .counter-total { margin-top: 0; }
      
      .panel-content { padding: 32px 24px; }
    }

    /* ══════════════════════════════════════════════════ */
    /*  Reduced Motion                                    */
    /* ══════════════════════════════════════════════════ */
    @media (prefers-reduced-motion: reduce) {
      .project-panel {
        position: relative !important;
        top: 0 !important;
        will-change: auto;
        transform: none !important;
        opacity: 1 !important;
        filter: none !important;
      }
    }
  `]
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projectsSection') projectsSection!: ElementRef;
  @ViewChild('sectionHeader') sectionHeader!: ElementRef;
  @ViewChild('decorLine') decorLine!: ElementRef;
  @ViewChild('stackContainer') stackContainer!: ElementRef;
  @ViewChildren('projectPanel') projectPanels!: QueryList<ElementRef>;

  public translationService = inject(TranslationService);
  translations = this.translationService.getTranslations('projects');

  totalStr = '06';

  private scrollTriggers: ScrollTrigger[] = [];
  private headerObserver: IntersectionObserver | null = null;
  private headerAnimated = false;

  // Static config for the projects
  private projectConfigs = [
    { number: '01', statusKey: 'progress', typeKey: 'internal', techStack: ['Angular', 'GSAP', 'Tailwind', 'Canvas'], gradient: 'linear-gradient(135deg, rgba(14, 14, 38, 0.95) 0%, rgba(8, 8, 24, 0.98) 100%)', statusClass: 'status-progress' },
    { number: '02', statusKey: 'updating', typeKey: 'product', techStack: ['Angular', 'Flutter', 'Node.js', 'PostgreSQL'], gradient: 'linear-gradient(135deg, rgba(16, 12, 34, 0.95) 0%, rgba(10, 8, 26, 0.98) 100%)', statusClass: 'status-updating' },
    { number: '03', statusKey: 'idea', typeKey: 'saas', techStack: ['Next.js', 'MongoDB', 'Stripe', 'Cloud Functions'], gradient: 'linear-gradient(135deg, rgba(10, 14, 30, 0.95) 0%, rgba(6, 8, 22, 0.98) 100%)', statusClass: 'status-idea' },
    { number: '04', statusKey: 'progress', typeKey: 'b2b', techStack: ['Angular', 'Express.js', 'PostgreSQL', 'Maps API'], gradient: 'linear-gradient(135deg, rgba(14, 10, 32, 0.95) 0%, rgba(8, 6, 22, 0.98) 100%)', statusClass: 'status-progress' },
    { number: '05', statusKey: 'live', typeKey: 'b2bweb', techStack: ['React', 'Firebase', 'Stripe', 'Analytics'], gradient: 'linear-gradient(135deg, rgba(10, 16, 28, 0.95) 0%, rgba(6, 10, 20, 0.98) 100%)', statusClass: 'status-live' },
    { number: '06', statusKey: 'idea', typeKey: 'b2g', techStack: ['Flutter', 'Node.js', 'PostGIS', 'ARCore'], gradient: 'linear-gradient(135deg, rgba(16, 14, 40, 0.95) 0%, rgba(10, 8, 28, 0.98) 100%)', statusClass: 'status-idea' }
  ];

  projects = computed<Project[]>(() => {
    const t = this.translations();
    return this.projectConfigs.map((config, index) => ({
      ...config,
      title: t.items[index].title,
      description: t.items[index].desc,
      status: t.status[config.statusKey],
      type: t.types[config.typeKey]
    }));
  });

  async ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate Header
    this.headerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.headerAnimated) {
        this.headerAnimated = true;
        this.animateHeader();
      }
    }, { threshold: 0.5 });
    
    this.headerObserver.observe(this.sectionHeader.nativeElement);

    // Give browsers a moment to layout
    setTimeout(() => {
      this.initStackAnimation();
    }, 100);
  }

  private animateHeader() {
    const tl = gsap.timeline();
    tl.fromTo(this.sectionHeader.nativeElement.querySelector('.section-title'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    tl.fromTo(this.decorLine.nativeElement,
      { width: 0 },
      { width: 80, duration: 0.8, ease: 'power2.inOut' },
      "-=0.5"
    );
  }

  private initStackAnimation() {
    const panels = this.projectPanels.toArray();
    
    panels.forEach((panelRef, i) => {
      const panel = panelRef.nativeElement;
      const inner = panel.querySelector('.panel-inner');
      const isLast = i === panels.length - 1;

      if (!isLast) {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 120px',
          endTrigger: this.stackContainer.nativeElement,
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            // As user scrolls, shrink the stuck panel slightly and dim it
            const progress = self.progress;
            const scale = 1 - (progress * 0.05);
            // Cap the opacity reduction to ensure it never completely disappears
            const opacity = 1 - (progress * 0.15); 
            
            gsap.set(inner, {
              scale: scale,
              opacity: opacity
            });
          }
        });
      }
    });

    // Master ScrollTrigger for the container to handle the final scroll-out
    ScrollTrigger.create({
      trigger: this.stackContainer.nativeElement,
      start: 'top bottom',
      end: 'bottom top',
      refreshPriority: 1
    });
  }

  ngOnDestroy(): void {
    if (this.headerObserver) this.headerObserver.disconnect();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
