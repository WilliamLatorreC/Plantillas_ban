import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaCategoriaComponent } from './crea-categoria.component';

describe('CreaCategoriaComponent', () => {
  let component: CreaCategoriaComponent;
  let fixture: ComponentFixture<CreaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
