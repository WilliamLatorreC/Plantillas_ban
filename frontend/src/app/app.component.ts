import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Necesario para [(ngModel)]


@Component({
  selector: 'app-root',
  standalone: true, // ✅ Importante para componentes standalone
  imports: [RouterOutlet, FormsModule], // ✅ Aquí incluyes FormsModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ Plural
})

export class AppComponent {
  title = 'Templates-Ban';
}

