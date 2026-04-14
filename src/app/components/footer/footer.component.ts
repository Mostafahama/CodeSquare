import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer-section bg-gradient-to-b from-[#030303] to-[#0A0A1F] pt-24 border-t border-[rgba(255,255,255,0.03)]">
      <div class="footer-container">
        
        <!-- Top CTA Section -->
        <div class="flex flex-col md:flex-row justify-between items-center bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-10 md:p-16 mb-20">
          <div class="max-w-2xl text-center md:text-left mb-8 md:mb-0">
            <h2 class="font-space font-bold text-3xl md:text-5xl text-[#F8FAFC] tracking-tight mb-4">Ready to scale?</h2>
            <p class="font-inter font-light text-[#CBD5E1] text-lg">Let's architect your next digital advantage.</p>
          </div>
          <button (click)="scrollTo('consultation-form')" class="px-8 py-4 bg-[#F8FAFC] text-[#030303] font-space font-semibold text-lg rounded-full hover:bg-[#A855F7] hover:text-[#F8FAFC] transition-colors duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(248,250,252,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            Start a Project
          </button>
        </div>

        <!-- 4-Column Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16">
          
          <!-- Column 1: Brand -->
          <div class="footer-brand">
            <h3 class="font-readex font-bold text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lilac to-white whitespace-nowrap">
              CS. Code Square
            </h3>
            <p class="font-inter font-light text-[#94A3B8] text-sm leading-relaxed pr-8">
              Engineering effortless digital experiences. We design, architect, and deliver premium software solutions for growing enterprises worldwide.
            </p>
          </div>

          <!-- Column 2: Services -->
          <div class="footer-links">
            <h4 class="font-space font-semibold text-[#F8FAFC] text-lg mb-6">Capabilities</h4>
            <ul class="flex flex-col gap-4">
              <li><a (click)="scrollTo('services-section')" class="nav-link">Web Engineering</a></li>
              <li><a (click)="scrollTo('services-section')" class="nav-link">Mobile Architecture</a></li>
              <li><a (click)="scrollTo('services-section')" class="nav-link">AI & SaaS Logic</a></li>
              <li><a (click)="scrollTo('services-section')" class="nav-link">UI/UX Polish</a></li>
            </ul>
          </div>

          <!-- Column 3: Company -->
          <div class="footer-links">
            <h4 class="font-space font-semibold text-[#F8FAFC] text-lg mb-6">Company</h4>
            <ul class="flex flex-col gap-4">
              <li><a (click)="scrollTo('about-section')" class="nav-link">About Us</a></li>
              <li><a (click)="scrollTo('process-section')" class="nav-link">Our Process</a></li>
              <li><a class="nav-link text-gray-500 cursor-not-allowed">Careers (Soon)</a></li>
              <li><a class="nav-link text-gray-500 cursor-not-allowed">Blog (Soon)</a></li>
            </ul>
          </div>

          <!-- Column 4: Contact & Social -->
          <div class="footer-contact">
            <h4 class="font-space font-semibold text-[#F8FAFC] text-lg mb-6">Connect</h4>
            <p class="font-inter font-light text-[#94A3B8] text-sm mb-6 max-w-[250px]">
              hello&#64;codesquare.dev<br>
              San Francisco, CA
            </p>
            <div class="flex gap-4">
              <a href="#" class="social-icon group bg-[rgba(255,255,255,0.05)] p-3 rounded-full hover:bg-[rgba(168,85,247,0.2)]">
                <svg class="w-5 h-5 text-[#94A3B8] group-hover:text-lilac transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" class="social-icon group bg-[rgba(255,255,255,0.05)] p-3 rounded-full hover:bg-[rgba(168,85,247,0.2)]">
                <svg class="w-5 h-5 text-[#94A3B8] group-hover:text-lilac transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div class="border-t border-[#1E293B] mt-8 py-8 flex flex-col md:flex-row justify-between items-center">
          <p class="font-inter font-light text-[#64748B] text-sm mb-4 md:mb-0">
            &copy; {{ currentYear }} Code Square. All rights reserved.
          </p>
          <div class="flex gap-6">
            <a href="#" class="font-inter font-light text-[#64748B] text-sm hover:text-[#A855F7] transition-colors">Privacy Policy</a>
            <a href="#" class="font-inter font-light text-[#64748B] text-sm hover:text-[#A855F7] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    .footer-section {
      width: 100%;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px;
    }

    .nav-link {
      font-family: 'Inter', sans-serif;
      font-size: 0.95rem;
      font-weight: 300;
      color: #94A3B8;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
      width: fit-content;
    }

    .nav-link:hover {
      color: #F8FAFC;
      transform: translateX(4px);
    }
    
    .nav-link.cursor-not-allowed:hover {
      transform: none;
      color: #64748B;
    }

    .social-icon {
      display: inline-block;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .social-icon:hover {
      transform: translateY(-4px);
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  scrollTo(elementId: string): void {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (elementId === 'hero') {
       window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
}
