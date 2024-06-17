import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionaisEditarComponent } from './profissionais-editar.component';

describe('ProfissionaisEditarComponent', () => {
  let component: ProfissionaisEditarComponent;
  let fixture: ComponentFixture<ProfissionaisEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionaisEditarComponent]
    });
    fixture = TestBed.createComponent(ProfissionaisEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
