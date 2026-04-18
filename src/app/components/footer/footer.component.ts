import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer-section bg-gradient-to-b from-[#030303] to-[#0A0A1F] pt-20 border-t border-[rgba(255,255,255,0.03)]" [attr.dir]="translationService.currentDir()">
      <div class="footer-container">

        <!-- 3-Column Footer Content -->
        <div class="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-12 pb-8">
          
          <!-- Column 1: Brand -->
          <div class="footer-brand max-w-sm text-center md:text-start">
            <h3 class="font-readex font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-lilac to-white whitespace-nowrap">
              {{ (translationService.currentLang() === 'ar') ? 'كود سكوير .CS' : 'CS. Code Square' }}
            </h3>
            <p class="font-inter font-light text-[#94A3B8] text-sm leading-relaxed">
              {{ translations().brandDesc }}
            </p>
          </div>

          <!-- Column 2: Capabilities -->
          <div class="footer-links text-center md:text-start">
            <h4 class="font-space font-semibold text-[#F8FAFC] text-base mb-4">{{ translations().caps }}</h4>
            <ul class="flex flex-row flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              <li><a (click)="scrollTo('services-section')" class="nav-link">{{ translations().links.web }}</a></li>
              <li><a (click)="scrollTo('services-section')" class="nav-link">{{ translations().links.mobile }}</a></li>
              <li><a (click)="scrollTo('services-section')" class="nav-link">{{ translations().links.ai }}</a></li>
              <li><a (click)="scrollTo('services-section')" class="nav-link">{{ translations().links.ui }}</a></li>
            </ul>
          </div>

          <!-- Column 3: Company -->
          <div class="footer-links text-center md:text-start">
            <h4 class="font-space font-semibold text-[#F8FAFC] text-base mb-4">{{ translations().company }}</h4>
            <ul class="flex flex-row flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              <li><a (click)="scrollTo('brand-statement')" class="nav-link">{{ translations().links.about }}</a></li>
              <li><a (click)="scrollTo('projects-section')" class="nav-link">{{ translations().links.work }}</a></li>
              <li><a (click)="scrollTo('process-section')" class="nav-link">{{ translations().links.process }}</a></li>
            </ul>

            <!-- Social Icons -->
            <div class="flex justify-center md:justify-start gap-4 mt-6">
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

        <!-- Bottom Bar -->
        <div class="border-t border-[#1E293B] mt-8 py-8 flex flex-col md:flex-row justify-between items-center">
          <p class="font-inter font-light text-[#64748B] text-sm mb-4 md:mb-0">
            &copy; {{ currentYear }} Code Square. {{ translations().bottom.rights }}
          </p>
          <div class="flex gap-6">
            <a href="#" class="font-inter font-light text-[#64748B] text-sm hover:text-[#A855F7] transition-colors">{{ translations().bottom.privacy }}</a>
            <a href="#" class="font-inter font-light text-[#64748B] text-sm hover:text-[#A855F7] transition-colors">{{ translations().bottom.terms }}</a>
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
    }

    .social-icon {
      display: inline-block;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .social-icon:hover {
      transform: translateY(-4px);
    }

    @media (max-width: 768px) {
      .footer-container {
        padding: 0 20px;
      }
    }
  `]
})
export class FooterComponent {
  public translationService = inject(TranslationService);
  currentYear = new Date().getFullYear();

  translations = this.translationService.getTranslations('footer');

  scrollTo(elementId: string): void {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (elementId === 'hero') {
       window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
}
