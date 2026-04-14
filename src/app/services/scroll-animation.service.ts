import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {

  async getGSAP() {
    try {
        const gsap = (await import('gsap')).default;
        const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
        gsap.registerPlugin(ScrollTrigger);
        return gsap;
    } catch (e) {
        console.warn('GSAP could not be loaded properly in ScrollAnimationService');
        return null;
    }
  }

  // Fade in + slide up
  async fadeInUp(element: string, delay = 0, duration = 0.8) {
    if (typeof window === 'undefined') return;
    const gsap = await this.getGSAP();
    if (!gsap) return;

    const target = document.querySelector(element);
    if (!target) return;
    
    gsap.fromTo(target, 
      { opacity: 0, y: 20 },
      {
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
        scrub: false,
      },
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
    });
  }

  // Stagger multiple elements
  async staggerFadeInUp(selector: string, staggerDelay = 0.15) {
    if (typeof window === 'undefined') return;
    const gsap = await this.getGSAP();
    if (!gsap) return;
    
    const elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0) return;

    gsap.fromTo(elements, 
      { opacity: 0, y: 30 },
      {
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerDelay,
      ease: 'power3.out',
    });
  }

  // Parallax effect
  async parallax(element: string, speed = 0.5) {
    if (typeof window === 'undefined') return;
    const gsap = await this.getGSAP();
    if (!gsap) return;

    const target = document.querySelector(element);
    if (!target) return;
    
    gsap.to(target, {
      scrollTrigger: { trigger: target, scrub: 0.5 },
      y: -(window.innerHeight * speed),
      ease: 'none',
    });
  }
}
