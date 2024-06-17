import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProfissionalServiceShortModel } from 'src/app/core/models/Add/ProfissionalAdd.Model';
import { ServiceFilter } from 'src/app/core/models/filter/ServiceFilter.model';
import { ServiceService } from 'src/app/core/services/servicos.service';

@Component({
  selector: 'app-profissional-criar-step-tres',
  templateUrl: './profissional-criar-step-tres.component.html',
  styleUrls: ['./profissional-criar-step-tres.component.scss']
})
export class ProfissionalCriarStepTresComponent {

  servicosProfissionalForm: FormGroup;

  servicos: any;

  @Output() formChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private servicoService: ServiceService
  ) { }

  ngOnInit() {
    this.getAllServices();

    this.buildForm(new ProfissionalServiceShortModel());

    this.servicosProfissionalForm.valueChanges.subscribe(value => {
      console.log('Dados do formulário em tempo real:', value);
      this.formChanged.emit(value);
    });
  }

  buildForm(service: ProfissionalServiceShortModel) {
    this.servicosProfissionalForm = this.formBuilder.group({
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
    console.log(this.servicosProfissionalForm.value);
  }
}
