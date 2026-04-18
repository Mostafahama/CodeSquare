import { Injectable, computed, inject } from '@angular/core';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class AnimationDirectionService {
  private translationService = inject(TranslationService);

  // When RTL, multiply X-axis movement by -1 to mirror the animation
  public xMultiplier = computed(() => this.translationService.currentDir() === 'rtl' ? -1 : 1);

  /**
   * Helper to quickly get a directionally correct X offset.
   * e.g., getX(-100) will slide from left in LTR, and from right in RTL.
   */
  public getX(value: number): number {
    return value * this.xMultiplier();
  }
}
