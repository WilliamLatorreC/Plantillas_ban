import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlantillaService } from '../../services/plantilla.service';

@Component({
  selector: 'app-create-templates',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-templates.component.html',
  styleUrls: ['./create-templates.component.css']
})
export class CreateTemplatesComponent {
  plantillaForm: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, private plantillaService: PlantillaService) {
    this.plantillaForm = this.fb.group({
      nombre: ['', Validators.required],
      producto: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }

  enviarFormulario() {
    if (this.plantillaForm.invalid) {
      this.mensaje = 'Por favor completa todos los campos.';
      return;
    }

    this.plantillaService.crearPlantilla(this.plantillaForm.value).subscribe({
      next: () => {
        this.mensaje = '✅ Plantilla guardada correctamente';
        this.plantillaForm.reset();
      },
      error: (err) => {
        console.error('Error al guardar plantilla:', err);
        this.mensaje = '❌ Ocurrió un error al guardar la plantilla';
      }
    });
  }
}
