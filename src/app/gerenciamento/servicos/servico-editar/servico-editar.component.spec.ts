import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoEditarComponent } from './servico-editar.component';

describe('ServicoEditarComponent', () => {
  let component: ServicoEditarComponent;
  let fixture: ComponentFixture<ServicoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicoEditarComponent]
    });
    fixture = TestBed.createComponent(ServicoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
