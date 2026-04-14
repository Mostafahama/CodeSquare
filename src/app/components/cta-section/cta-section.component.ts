import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="consultation-form" class="cta-section">
      <div class="cta-container">
        <!-- Split Layout -->
        <div class="cta-split">
          
          <!-- Left: Pitch -->
          <div class="cta-pitch">
            <h2 class="font-grotesk font-bold text-text-primary mb-6 leading-tight" style="font-size: clamp(2rem, 4vw, 2.625rem);">
              Let's build something <span class="text-transparent bg-clip-text bg-gradient-to-r from-lilac to-magenta">extraordinary.</span>
            </h2>
            <p class="font-inter font-light text-text-secondary text-lg mb-8 leading-relaxed max-w-md">
              Whether you need a high-performance web app, a native mobile experience, or a complex enterprise system—we're ready to engineer it.
            </p>
            <div class="premium-divider"></div>
            <div class="contact-info mt-8">
              <p class="font-inter text-text-secondary mb-2">Or email us directly at:</p>
              <a href="mailto:hello@codesquare.tech" class="font-grotesk font-semibold text-xl text-white hover:text-lilac transition-colors">hello&#64;codesquare.tech</a>
            </div>
          </div>

          <!-- Right: Form -->
          <div class="cta-form-container glass-panel">
            
            <ng-container *ngIf="!isSubmitted; else successState">
              <form [formGroup]="consultationForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
                
                <!-- Project Name -->
                <div class="form-group">
                  <label class="form-label" for="projectName">Project Name</label>
                  <div class="input-wrapper">
                    <input type="text" id="projectName" formControlName="projectName" class="form-input" placeholder="e.g. Acme Corp Redesign" />
                    <span class="validation-icon" *ngIf="isValid('projectName')">✓</span>
                  </div>
                </div>

                <!-- Email -->
                <div class="form-group">
                  <label class="form-label" for="email">Your Email</label>
                  <div class="input-wrapper">
                    <input type="email" id="email" formControlName="email" class="form-input" placeholder="you@company.com" />
                    <span class="validation-icon" *ngIf="isValid('email')">✓</span>
                  </div>
                </div>

                <!-- Budget Range -->
                <div class="form-group">
                  <label class="form-label" for="budget">Budget Range</label>
                  <div class="input-wrapper select-wrapper">
                    <select id="budget" formControlName="budget" class="form-input custom-select">
                      <option value="" disabled selected>Select an estimate...</option>
                      <option value="<10k">&lt; $10k</option>
                      <option value="10k-50k">$10k - $50k</option>
                      <option value="50k+">$50k+</option>
                      <option value="custom">Custom</option>
                    </select>
                    <span class="validation-icon" *ngIf="isValid('budget')">✓</span>
                  </div>
                </div>

                <!-- Project Type (Checkboxes) -->
                <div class="form-group mb-2">
                  <label class="form-label mb-3 block">Project Type</label>
                  <div class="checkbox-grid">
                    <label class="checkbox-container" *ngFor="let type of projectTypes; let i = index">
                      <input type="checkbox" [value]="type" (change)="onCheckboxChange($event)" />
                      <span class="checkmark"></span>
                      <span class="check-label">{{type}}</span>
                    </label>
                  </div>
                </div>

                <!-- Message -->
                <div class="form-group mb-4">
                  <label class="form-label" for="message">Message Details</label>
                  <div class="input-wrapper">
                    <textarea id="message" formControlName="message" class="form-input" rows="3" placeholder="Tell us about the features, timeline, and goals..."></textarea>
                    <span class="validation-icon" *ngIf="isValid('message')">✓</span>
                  </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="submit-btn" [disabled]="consultationForm.invalid || isSubmitting">
                  <span *ngIf="!isSubmitting">Send Request</span>
                  <div *ngIf="isSubmitting" class="spinner"></div>
                </button>
              </form>
            </ng-container>

            <!-- Success State -->
            <ng-template #successState>
              <div class="success-message">
                <div class="success-icon">
                  <svg class="w-12 h-12 text-lilac" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="font-grotesk font-bold text-2xl text-white mb-2">Request Received</h3>
                <p class="font-inter text-text-secondary">
                  Thank you! Our technical lead will review your details and reach out within 24 hours.
                </p>
                <button class="hero-cta-btn mt-8 text-sm" (click)="resetForm()">Send Another Request</button>
              </div>
            </ng-template>

          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-section {
      padding: 100px 40px;
      background: linear-gradient(180deg, #030303 0%, #1E1B4B 100%);
      position: relative;
    }

    .cta-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .cta-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .premium-divider {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, #A855F7, #EC4899);
      border-radius: 2px;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(168, 85, 247, 0.15);
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }

    .form-group {
      position: relative;
    }

    .form-label {
      font-family: var(--font-body);
      font-weight: 500;
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 6px;
      display: block;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .input-wrapper {
      position: relative;
    }

    .form-input {
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 14px 16px;
      font-family: var(--font-body);
      font-size: 14px;
      color: #F8FAFC !important;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #A855F7;
      box-shadow: 0 0 15px rgba(168, 85, 247, 0.2);
      background: rgba(0, 0, 0, 0.4);
    }

    .form-input::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }

    .validation-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #10B981; /* Emerald Green */
      font-weight: bold;
      animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes popIn {
      0% { transform: translateY(-50%) scale(0); }
      100% { transform: translateY(-50%) scale(1); }
    }

    /* Checkboxes */
    .checkbox-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      font-family: var(--font-body);
      font-size: 13px;
      color: #CBD5E1;
      padding-left: 28px;
      user-select: none;
    }

    .checkbox-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      height: 18px;
      width: 18px;
      background-color: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .checkbox-container:hover input ~ .checkmark {
      border-color: #A855F7;
    }

    .checkbox-container input:checked ~ .checkmark {
      background-color: #A855F7;
      border-color: #A855F7;
      box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
    }

    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .checkbox-container input:checked ~ .checkmark:after {
      display: block;
    }

    .submit-btn {
      background: #A855F7;
      color: white;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 16px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 52px;
      margin-top: 8px;
    }

    .submit-btn:hover:not([disabled]) {
      background: #9333EA;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
      transform: translateY(-2px);
    }

    .submit-btn[disabled] {
      background: rgba(168, 85, 247, 0.4);
      cursor: not-allowed;
      color: rgba(255,255,255,0.6);
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      100% { transform: rotate(360deg); }
    }

    .success-message {
      text-align: center;
      padding: 40px 20px;
      animation: fadeIn 0.5s ease-out;
    }

    .success-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(168,85,247,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      border: 1px solid rgba(168,85,247,0.3);
      box-shadow: 0 0 30px rgba(168,85,247,0.2);
    }

    .hero-cta-btn {
      padding: 10px 24px;
      border: 1px solid #A855F7;
      background: transparent;
      color: #F8FAFC;
      border-radius: 6px;
      transition: 0.3s;
    }
    .hero-cta-btn:hover { background: rgba(168,85,247,0.2); }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 900px) {
      .cta-split {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .cta-pitch {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .premium-divider {
        margin: 0 auto;
      }
    }
  `]
})
export class CtaSectionComponent implements OnInit {
  consultationForm!: FormGroup;
  isSubmitting = false;
  isSubmitted = false;

  projectTypes = ['Web App', 'Mobile App', 'UI/UX Design', 'Custom System'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.consultationForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      budget: ['', Validators.required],
      types: this.fb.array([], Validators.required),
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onCheckboxChange(e: any) {
    const types: FormArray = this.consultationForm.get('types') as FormArray;
    if (e.target.checked) {
      types.push(new FormControl(e.target.value));
    } else {
      const index = types.controls.findIndex(x => x.value === e.target.value);
      types.removeAt(index);
    }
  }

  isValid(field: string): boolean {
    const control = this.consultationForm.get(field);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.consultationForm.valid) {
      this.isSubmitting = true;
      // Simulate API Call
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        console.log('Form submission successful', this.consultationForm.value);
      }, 1500);
    }
  }

  resetForm() {
    this.isSubmitted = false;
    this.consultationForm.reset();
    const types: FormArray = this.consultationForm.get('types') as FormArray;
    types.clear();
  }
}
