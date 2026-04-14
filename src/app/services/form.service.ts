import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor() {}

  // Mocked submit for frontend-only
  submitConsultation(formData: ContactFormData): Observable<any> {
    console.log('Mock submission received:', formData);
    return of({
      success: true,
      message: 'Thank you for your inquiry. We\'ll contact you within 24 hours.',
      data: {
        id: Math.floor(Math.random() * 1000),
        created_at: new Date().toISOString()
      }
    }).pipe(delay(1500)); // Simulate network latency
  }
}
