import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ClientPlans } from 'src/app/core/models/Add/ClienteAdd.Model';
import { ServiceFilter } from 'src/app/core/models/filter/ServiceFilter.model';
import { ServiceService } from 'src/app/core/services/servicos.service';
import {ClienteCriarStepTresStateService} from "./cliente-criar-step-tres-state.service";
import {CdkStepperModule} from "@angular/cdk/stepper";

@Component({
  selector: 'app-cliente-criar-step-dois',
  templateUrl: './cliente-criar-step-tres.component.html',
  standalone: true,
  imports: [
    CdkStepperModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./cliente-criar-step-dois.component.scss']
})
export class ClienteCriarStepTresComponent implements OnInit {

  planosClienteForm: FormGroup;

  planos: any;

  @Output() formChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private servicoService: ServiceService,
    private clienteServiceShortModelStateService: ClienteCriarStepTresStateService
  ) { }

  ngOnInit() {
    this.clienteServiceShortModelStateService.getValue().subscribe(data => {
      this.buildForm(data);
    });

    this.planosClienteForm.valueChanges.subscribe(value => {
      console.log('Dados do formulário em tempo real:', value);
      this.formChanged.emit(value);
    });
  }

  buildForm(service: ClientPlans) {
    this.planosClienteForm = this.formBuilder.group({
      IdPlanCard: [service.IdPlanCard],
      PlanCardNumber: [service.PlanCardNumber],
    });
  }

  getAllServices() {
    this.servicoService.getAll(new ServiceFilter()).subscribe((response) => {
      console.log(response);
      this.planos = response;
    });
  }

  nextStep() {
    console.log(this.planosClienteForm.value);
    this.clienteServiceShortModelStateService.setValue(this.planosClienteForm.value);
  }

  returnStep() {
    console.log(this.planosClienteForm.value);
    this.clienteServiceShortModelStateService.setValue(this.planosClienteForm.value);
  }
}
