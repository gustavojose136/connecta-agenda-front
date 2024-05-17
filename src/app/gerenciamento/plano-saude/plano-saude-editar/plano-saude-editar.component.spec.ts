import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoSaudeEditarComponent } from './plano-saude-editar.component';

describe('PlanoSaudeEditarComponent', () => {
  let component: PlanoSaudeEditarComponent;
  let fixture: ComponentFixture<PlanoSaudeEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoSaudeEditarComponent]
    });
    fixture = TestBed.createComponent(PlanoSaudeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
