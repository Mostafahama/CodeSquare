import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from './service-card.component';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  size: 'normal' | 'tall' | 'wide';
  align: 'left' | 'center';
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
  template: `
    <section id="services-section" class="services-section" #servicesSection>
      <div class="services-container">
        
        <div class="mb-20 text-center">
          <h2 class="section-title text-center m-0">Our Services</h2>
          <p class="font-inter font-light text-[16px] text-[#A855F7] mt-4">Integrated digital solutions</p>
        </div>

        <div class="cards-grid">
          <app-service-card 
            *ngFor="let card of serviceCards"
            class="service-wrapper"
            [class]="'grid-' + card.size"
            [title]="card.title"
            [description]="card.description"
            [icon]="card.icon"
            [features]="card.features"
            [align]="card.align">
          </app-service-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      padding: 100px 40px;
      background: linear-gradient(135deg, #0A0A1F, #030303);
      position: relative;
    }

    .services-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 48px;
      font-weight: 700;
      color: #F8FAFC;
    }

    /* Asymmetric Premium Grid Layout */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(280px, auto);
      gap: 20px;
      width: 100%;
    }

    .grid-normal {
      grid-column: span 1;
      grid-row: span 1;
    }

    .grid-tall {
      grid-column: span 1;
      grid-row: span 2;
    }
    
    .grid-wide {
      grid-column: span 2;
      grid-row: span 1;
    }

    @media (max-width: 1024px) {
      .cards-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .grid-tall {
        grid-column: span 1;
        grid-row: span 2;
      }
      .grid-wide {
        grid-column: span 2;
        grid-row: span 1;
      }
    }

    @media (max-width: 768px) {
      .cards-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .grid-normal, .grid-tall, .grid-wide {
        grid-column: span 1;
        grid-row: span 1;
      }
    }
  `]
})
export class ServicesComponent implements AfterViewInit {
  serviceCards: ServiceCard[] = [
    {
      id: 'mobile',
      title: 'Mobile Applications',
      description: 'Native and cross-platform apps for Android & iOS that feel right and work incredibly fast globally.',
      icon: '<path d="M7 2h10v20H7V2zm2 2v14h6V4H9z"/>',
      size: 'normal', 
      align: 'left',
      features: ['Flutter', 'React Native', 'Swift']
    },
    {
      id: 'web',
      title: 'Web Development',
      description: 'Build performant, scalable web applications with modern frameworks. From MVPs to robust enterprise portals.',
      icon: '<path d="M4 4h16v16H4V4zm2 4v10h12V8H6zM8 10h8v2H8v-2z"/>',
      size: 'tall', 
      align: 'left',
      features: ['React', 'Angular', 'Node.js', 'AWS']
    },
    {
      id: 'saas',
      title: 'SaaS Systems',
      description: 'Scalable multi-tenant platforms built for explosive growth with robust billing and user management integrations.',
      icon: '<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 10H7v-2h6v2zm4-4H7V7h10v2z"/>',
      size: 'normal', 
      align: 'left',
      features: ['Multi-tenant Logic', 'Stripe Integration']
    },
    {
      id: 'ai',
      title: 'AI Solutions',
      description: 'Intelligent automation systems for smarter workflows. We integrate robust LLMs directly into your data pipelines.',
      icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9H14c0 1.1-.9 2-2 2s-2-.9-2-2H8.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5z"/>',
      size: 'tall', 
      align: 'left',
      features: ['Machine Learning', 'RAG Pipelines', 'OpenAI APIs']
    },
    {
      id: 'ui',
      title: 'UI/UX Design',
      description: 'Interfaces that balance aesthetics with massive usability. Awwwards-tier visual designs targeting intense user retention and journey flows.',
      icon: '<path d="M21 3H3v18h18V3zm-2 16H5V5h14v14zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>',
      size: 'normal', 
      align: 'left',
      features: ['Figma Prototyping', 'User Research']
    },
    {
      id: 'system',
      title: 'System Integration',
      description: 'Connecting IoT arrays and Smart Systems. We unify fragmented hardware endpoints into centralized observability dashboards.',
      icon: '<path d="M15 4v7H5.17l-.59.59-.58.58V4h11m2-2H2v18h20V2zM12 9h2v2h-2V9zm-3 0h2v2H9V9zm-3 0h2v2H6V9z"/>',
      size: 'normal', 
      align: 'left',
      features: ['IoT protocols', 'API Gateways', 'Docker']
    },
    {
      id: 'support',
      title: 'Maintenance & Support',
      description: 'Rigorous post-launch maintenance ensures sustained digital velocity and maximum uptime. We monitor servers globally.',
      icon: '<path d="M11 21.9A8.98 8.98 0 0021.9 11h-2.02A6.98 6.98 0 0113 19.88V21.9zM19.88 13A6.98 6.98 0 0113 4.12V2.1A8.98 8.98 0 0021.9 13h-2.02zM11 2.1v2.02A6.98 6.98 0 004.12 11H2.1A8.98 8.98 0 0111 2.1zm-8.9 11H4.12A6.98 6.98 0 0011 19.88v2.02A8.98 8.98 0 012.1 13z"/>',
      size: 'tall', 
      align: 'left',
      features: ['24/7 Monitoring', 'SLA Guarantees', 'CI/CD']
    }
  ];

  constructor(private scrollAnimation: ScrollAnimationService) {}

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      const cards = document.querySelectorAll('.service-wrapper');
      gsap.fromTo(cards, 
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1, 
          scale: 1,
          stagger: 0.08, // Very fast wave effect stagger
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.cards-grid',
            start: 'top 85%'
          }
        }
      );
    }, 100);
  }
}
