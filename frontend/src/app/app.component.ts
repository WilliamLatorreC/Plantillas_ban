import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Necesario para [(ngModel)]
import { TemplatesComponent } from './components/templates/templates.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TemplatesComponent],
  template: `
    <app-templates></app-templates>
  `,
})

export class AppComponent {
  title = 'Templates-Ban';
}

