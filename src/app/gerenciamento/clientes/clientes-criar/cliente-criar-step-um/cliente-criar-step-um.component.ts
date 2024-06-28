import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Profissional} from 'src/app/core/models/Add/ProfissionalAdd.Model';
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

  buildForm(filter: Profissional) {
    this.ClienteDataForm = this.formBuilder.group({
      name: [filter.name],
      socialName: [filter.socialName],
      email: [filter.email],
      password: [filter.password],
      gender: [filter.gender],
      phone: [filter.phone],
      cpf: [filter.cpf],
      rg: [filter.rg],
      birthDate: [filter.birthDate],
      isAdmin: [filter.isAdmin],
      image: [filter.image],
      worksDays: [filter.worksDays],
    });
  }

  nextStep() {
    console.log(this.ClienteDataForm.value);
    this.dadosClienteStateSerivce.setValue(this.ClienteDataForm.value);
    // this.formSubmitted.emit(this.dadosClienteForm.value);
  }
}
