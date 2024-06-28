import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProfissionalServiceShortModel } from 'src/app/core/models/Add/ProfissionalAdd.Model';
import { ServiceFilter } from 'src/app/core/models/filter/ServiceFilter.model';
import { ServiceService } from 'src/app/core/services/servicos.service';
import {ClienteCriarStepDoisStateService} from "./cliente-criar-step-dois-state.service";

@Component({
  selector: 'app-cliente-criar-step-dois',
  templateUrl: './cliente-criar-step-dois.component.html',
  standalone: true,
  styleUrls: ['./cliente-criar-step-dois.component.scss']
})
export class ClienteCriarStepTresComponent implements OnInit {

  servicosClienteForm: FormGroup;

  servicos: any;

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

    this.servicosClienteForm.valueChanges.subscribe(value => {
      console.log('Dados do formulário em tempo real:', value);
      this.formChanged.emit(value);
    });
  }

  buildForm(service: ProfissionalServiceShortModel) {
    this.servicosClienteForm = this.formBuilder.group({
      serviceId: [service.serviceId],
      price: [service.price],
      description: [service.description],
      duration: [service.duration],
    });
  }

  getAllServices() {
    this.servicoService.getAll(new ServiceFilter()).subscribe((response) => {
      console.log(response);
      this.servicos = response;
    });
  }

  nextStep() {
    console.log(this.servicosClienteForm.value);
    this.clienteServiceShortModelStateService.setValue(this.servicosClienteForm.value);
  }

  returnStep() {
    console.log(this.servicosClienteForm.value);
    this.clienteServiceShortModelStateService.setValue(this.servicosClienteForm.value);
  }
}
