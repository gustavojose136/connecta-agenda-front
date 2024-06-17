import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profissional } from 'src/app/core/models/Add/ProfissionalAdd.Model';

@Component({
  selector: 'app-profissional-criar-step-um',
  templateUrl: './profissional-criar-step-um.component.html',
  styleUrls: ['./profissional-criar-step-um.component.scss']
})
export class ProfissionalCriarStepUmComponent {

  @Output() formChanged: EventEmitter<any> = new EventEmitter();

  dadosClienteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm(new Profissional());

    this.dadosClienteForm.valueChanges.subscribe(value => {
      console.log('Dados do formulário em tempo real:', value);
      this.formChanged.emit(value);
    });
  }

  buildForm(filter: Profissional) {
    this.dadosClienteForm = this.formBuilder.group({
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
    console.log(this.dadosClienteForm.value);
    // this.formSubmitted.emit(this.dadosClienteForm.value);
  }
}
