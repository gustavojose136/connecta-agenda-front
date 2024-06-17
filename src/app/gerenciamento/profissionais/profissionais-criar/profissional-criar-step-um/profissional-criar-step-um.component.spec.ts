import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalCriarStepUmComponent } from './profissional-criar-step-um.component';

describe('ProfissionalCriarStepUmComponent', () => {
  let component: ProfissionalCriarStepUmComponent;
  let fixture: ComponentFixture<ProfissionalCriarStepUmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionalCriarStepUmComponent]
    });
    fixture = TestBed.createComponent(ProfissionalCriarStepUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
