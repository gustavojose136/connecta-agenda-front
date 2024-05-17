import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoSaudeComponent } from './plano-saude.component';

describe('PlanoSaudeComponent', () => {
  let component: PlanoSaudeComponent;
  let fixture: ComponentFixture<PlanoSaudeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoSaudeComponent]
    });
    fixture = TestBed.createComponent(PlanoSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
