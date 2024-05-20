import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PlanCardAdd } from 'src/app/core/models/Add/PlanCard.models';
import { PlanCardService } from 'src/app/core/services/planCard.service';

@Component({
  selector: 'app-plano-saude-editar',
  templateUrl: './plano-saude-editar.component.html',
  styleUrls: ['./plano-saude-editar.component.scss']
})
export class PlanoSaudeEditarComponent {

  planBeUpdated: any;

  planoSaudeForm: FormGroup;

  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private planCardService: PlanCardService,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    console.log(this.planBeUpdated);
    this.buildForm(new PlanCardAdd());
    this.fillForm();
  }

  buildForm(plano: PlanCardAdd) {
    this.planoSaudeForm = this.formBuilder.group({
      Id: [plano.Id],
      Name: [plano.Name, [Validators.required]],
      Description: [plano.Description],
      IsActive: [plano.IsActive, [Validators.required]],
    });
  }

  fillForm(){
    this.planoSaudeForm.patchValue({
      Id: this.planBeUpdated.id,
      Name: this.planBeUpdated.name,
      Description: this.planBeUpdated.description,
      IsActive: this.planBeUpdated.isActive
    });
  }

  closeModal(){
    this.modalRef?.hide();
  }

  UpdatePlanCard(){
    console.log(this.planoSaudeForm.value);
    this.planCardService.update(this.planoSaudeForm.value).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success("Plano de saúde Editado com sucesso");
        this.closeModal();
      },
      error => {
        console.log(error);
        this.toastr.error("Erro ao aditar plano de saúde");
      }
    )
  }

  getControl(name: string): AbstractControl {
    return this.planoSaudeForm.get(name);
  }
}
