import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budget?: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitContact(form: ContactForm): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/contact`, form);
  }
}