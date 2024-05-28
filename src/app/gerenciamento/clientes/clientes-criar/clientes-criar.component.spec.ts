import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesCriarComponent } from './clientes-criar.component';

describe('ClientesCriarComponent', () => {
  let component: ClientesCriarComponent;
  let fixture: ComponentFixture<ClientesCriarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesCriarComponent]
    });
    fixture = TestBed.createComponent(ClientesCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
