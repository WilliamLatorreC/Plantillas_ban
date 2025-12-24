import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPreviewComponent } from './vista-preview.component';

describe('VistaPreviewComponent', () => {
  let component: VistaPreviewComponent;
  let fixture: ComponentFixture<VistaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
