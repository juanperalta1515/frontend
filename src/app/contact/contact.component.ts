import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  whatsappNumber = '5493515198875'; // Número sin + ni espacios

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    serviceType: ['Página Web', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  serviceOptions = [
    'Página Web',
    'Tienda Online (E‑Commerce)',
    'Landing Page',
    'Otra',
  ];

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';
    if (this.contactForm.invalid) {
      return;
    }
    
    try {
      const formData = this.contactForm.value as any;
      const message = this.generateWhatsAppMessage(formData);
      this.sendToWhatsApp(message);
      
      this.successMessage =
        '¡Gracias! Se abrirá WhatsApp para enviar tu solicitud. Por favor, presiona enviar en WhatsApp.';
      setTimeout(() => {
        this.contactForm.reset({ serviceType: 'Página Web' });
        this.submitted = false;
      }, 3000);
    } catch (error: any) {
      this.errorMessage =
        'Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.';
      console.error(error);
    }
  }

  private generateWhatsAppMessage(formData: any): string {
    const { name, email, phone, serviceType, description } = formData;
    
    let message = `📋 *NUEVA SOLICITUD DE PRESUPUESTO*\n\n`;
    message += `👤 *Nombre:* ${name}\n`;
    message += `📧 *Email:* ${email}\n`;
    message += `📱 *Teléfono:* ${phone || 'No proporcionado'}\n`;
    message += `🎯 *Tipo de Servicio:* ${serviceType}\n`;
    message += `📝 *Descripción del Proyecto:*\n${description}\n\n`;
    message += `---\nMensaje enviado desde la página web de Juan Peralta`;
    
    return message;
  }

  private sendToWhatsApp(message: string): void {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
}