import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillaService } from '../../services/plantilla.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-templates',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h2>Lista de Plantillas</h2>
    <ul>
      <li *ngFor="let plantilla of plantillas">
        {{ plantilla.nombre }} - {{ plantilla.contenido }}
      </li>
    </ul>
  `
})
export class ListTemplatesComponent implements OnInit {
  plantillas: any[] = [];

  constructor(private plantillaService: PlantillaService) {}

  ngOnInit(): void {
    this.plantillaService.getPlantillas().subscribe(data => this.plantillas = data);
  }
}
