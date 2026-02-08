import { Import } from './../../node_modules/@angular/compiler-cli/src/ngtsc/reflection/src/host.d';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component'; 
@Component({
  selector: 'app-root',
  standalone: true, // Esto confirma que es standalone
  imports: [CommonModule, ContactComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}