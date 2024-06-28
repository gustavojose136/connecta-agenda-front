import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ClientAddres } from 'src/app/core/models/Add/ClienteAdd.Model';
import { ServiceFilter } from 'src/app/core/models/filter/ServiceFilter.model';
import { ServiceService } from 'src/app/core/services/servicos.service';
import {ClienteCriarStepDoisStateService} from "./cliente-criar-step-dois-state.service";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {NgIf} from "@angular/common";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-cliente-criar-step-dois',
  templateUrl: './cliente-criar-step-dois.component.html',
  standalone: true,
  imports: [
    CdkStepperModule,
    NgIf,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  styleUrls: ['./cliente-criar-step-dois.component.scss']
})
export class ClienteCriarStepTresComponent implements OnInit {

  addressClienteForm: FormGroup;

  address: any;

  @Output() formChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private servicoService: ServiceService,
    private clienteServiceShortModelStateService: ClienteCriarStepDoisStateService
  ) { }

  ngOnInit() {
    this.clienteServiceShortModelStateService.getValue().subscribe(data => {
      this.buildForm(data);
    });

    this.addressClienteForm.valueChanges.subscribe(value => {
      console.log('Dados do formulário em tempo real:', value);
      this.formChanged.emit(value);
    });
  }

  buildForm(address: ClientAddres) {
    this.addressClienteForm = this.formBuilder.group({
      Name: [address.Name],
      Street: [address.Street],
      Neighborhood: [address.Neighborhood],
      Number: [address.Number],
      City: [address.City],
      ZipCode: [address.ZipCode],
      State: [address.State],
      Country: [address.Country],
      Observation: [address.Observation],
    });
  }

  getAllServices() {
    this.servicoService.getAll(new ServiceFilter()).subscribe((response) => {
      console.log(response);
      this.address = response;
    });
  }

  nextStep() {
    console.log(this.addressClienteForm.value);
    this.clienteServiceShortModelStateService.setValue(this.addressClienteForm.value);
  }

  returnStep() {
    console.log(this.addressClienteForm.value);
    this.clienteServiceShortModelStateService.setValue(this.addressClienteForm.value);
  }
}
