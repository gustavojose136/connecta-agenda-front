import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoSaudeCriarComponent } from './plano-saude-criar.component';

describe('PlanoSaudeCriarComponent', () => {
  let component: PlanoSaudeCriarComponent;
  let fixture: ComponentFixture<PlanoSaudeCriarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoSaudeCriarComponent]
    });
    fixture = TestBed.createComponent(PlanoSaudeCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
