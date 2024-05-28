import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoCriarComponent } from './servico-criar.component';

describe('ServicoCriarComponent', () => {
  let component: ServicoCriarComponent;
  let fixture: ComponentFixture<ServicoCriarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicoCriarComponent]
    });
    fixture = TestBed.createComponent(ServicoCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
