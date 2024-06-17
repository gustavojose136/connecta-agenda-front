import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalCriarStepTresComponent } from './profissional-criar-step-tres.component';

describe('ProfissionalCriarStepTresComponent', () => {
  let component: ProfissionalCriarStepTresComponent;
  let fixture: ComponentFixture<ProfissionalCriarStepTresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionalCriarStepTresComponent]
    });
    fixture = TestBed.createComponent(ProfissionalCriarStepTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
