import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionClienteComponent } from './seleccion-cliente.component';

describe('SeleccionClienteComponent', () => {
  let component: SeleccionClienteComponent;
  let fixture: ComponentFixture<SeleccionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
