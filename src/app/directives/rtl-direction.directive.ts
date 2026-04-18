import { Directive, EffectRef, effect, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Directive({
  selector: '[appRtl]',
  standalone: true
})
export class RtlDirectionDirective {
  private translationService = inject(TranslationService);
  private directionEffect: EffectRef;

  constructor() {
    // Setup a reactivity effect to watch the computed signal from TranslationService
    this.directionEffect = effect(() => {
      const dir = this.translationService.currentDir();
      const documentHtml = document.documentElement;
      
      // Update the <html> dir and lang attributes
      documentHtml.setAttribute('dir', dir);
      documentHtml.setAttribute('lang', this.translationService.currentLang());
    });
  }
}
