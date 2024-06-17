import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalCriarStepDoisComponent } from './profissional-criar-step-dois.component';

describe('ProfissionalCriarStepDoisComponent', () => {
  let component: ProfissionalCriarStepDoisComponent;
  let fixture: ComponentFixture<ProfissionalCriarStepDoisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionalCriarStepDoisComponent]
    });
    fixture = TestBed.createComponent(ProfissionalCriarStepDoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
