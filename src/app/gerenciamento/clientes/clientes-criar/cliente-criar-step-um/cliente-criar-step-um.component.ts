import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Client} from 'src/app/core/models/Add/ClienteAdd.Model';
import {ClienteCriarStepUmStateService} from "./cliente-criar-step-um-state.service";

@Component({
  selector: 'app-cliente-criar-step-um',
  templateUrl: './cliente-criar-step-um.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./cliente-criar-step-um.component.scss']
})
export class ClienteCriarStepUmComponent implements OnInit {

  @Output() formChanged: EventEmitter<any> = new EventEmitter();

  ClienteDataForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dadosClienteStateSerivce: ClienteCriarStepUmStateService
  ) {
  }

  ngOnInit() {
    this.dadosClienteStateSerivce.getValue().subscribe(dadosCliente => {
      this.buildForm(dadosCliente);
    })

    this.ClienteDataForm.valueChanges.subscribe(value => {
      console.log('Dados do formulário em tempo real:', value);
      this.formChanged.emit(value);
    });
  }

  buildForm(filter: Client) {
    this.ClienteDataForm = this.formBuilder.group({
      name: [filter.Name],
      socialName: [filter.SocialName],
      email: [filter.Email],
      password: [filter.Password],
      gender: [filter.Gender],
      phone: [filter.Phone],
      cpf: [filter.Cpf],
      rg: [filter.Rg],
      birthDate: [filter.BirthDate],
      isAdmin: [filter.IsAdmin],
      image: [filter.Image],
    });
  }

  nextStep() {
    console.log(this.ClienteDataForm.value);
    this.dadosClienteStateSerivce.setValue(this.ClienteDataForm.value);
    // this.formSubmitted.emit(this.dadosClienteForm.value);
  }
}
