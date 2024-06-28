import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfissionalAddres } from 'src/app/core/models/Add/ProfissionalAdd.Model';
import {ProfissionalAddressStateService} from "./profissional-address-state.service";

@Component({
  selector: 'app-profissional-criar-step-dois',
  templateUrl: './profissional-criar-step-dois.component.html',
  styleUrls: ['./profissional-criar-step-dois.component.scss']
})
export class ProfissionalCriarStepDoisComponent implements OnInit {

  enderecoProfissionalForm: FormGroup;

  @Output() formChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private profissionalAddressStateService: ProfissionalAddressStateService
  ) { }

  ngOnInit() {
    this.profissionalAddressStateService.getValue().subscribe(address => {
      this.buildForm(address);
    });

    this.enderecoProfissionalForm.valueChanges.subscribe(value => {
      console.log('Dados do formulário em tempo real:', value);
      this.formChanged.emit(value);
    });
  }

  buildForm(address: ProfissionalAddres) {
    this.enderecoProfissionalForm = this.formBuilder.group({
      name: [address.name] = "Principal",
      street: [address.street],
      neighborhood: [address.neighborhood],
      number: [address.number],
      city: [address.city],
      zipCode: [address.zipCode],
      state: [address.state],
      country: [address.country] = "Brasil",
      observation: [address.observation]
    });
  }

  nextStep() {
    console.log(this.enderecoProfissionalForm.value);
    this.profissionalAddressStateService.setValue(this.enderecoProfissionalForm.value);
  }

  returnStep() {
    console.log(this.enderecoProfissionalForm.value);
    this.profissionalAddressStateService.setValue(this.enderecoProfissionalForm.value);
  }
}
