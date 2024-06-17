import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionaisCriarComponent } from './profissionais-criar.component';

describe('ProfissionaisCriarComponent', () => {
  let component: ProfissionaisCriarComponent;
  let fixture: ComponentFixture<ProfissionaisCriarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionaisCriarComponent]
    });
    fixture = TestBed.createComponent(ProfissionaisCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
