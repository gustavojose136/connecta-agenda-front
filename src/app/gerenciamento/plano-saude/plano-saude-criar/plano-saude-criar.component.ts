import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PlanCardAdd } from 'src/app/core/models/Add/PlanCard.models';
import { PlanCardService } from 'src/app/core/services/planCard.service';

@Component({
  selector: 'app-plano-saude-criar',
  templateUrl: './plano-saude-criar.component.html',
  styleUrls: ['./plano-saude-criar.component.scss']
})
export class PlanoSaudeCriarComponent {

  planoSaudeForm: FormGroup;

  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private planCardService: PlanCardService,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.buildForm(new PlanCardAdd());
  }

  buildForm(plano: PlanCardAdd) {
    this.planoSaudeForm = this.formBuilder.group({
      Name: [plano.Name, [Validators.required]],
      Description: [plano.Description],
    });
  }

  closeModal(){
    this.modalRef?.hide();
  }

  createPlanCard(){
    console.log(this.planoSaudeForm.value);
    this.planCardService.add(this.planoSaudeForm.value).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success("Plano de saúde criado com sucesso");
        this.closeModal();
      },
      error => {
        console.log(error);
        this.toastr.error("Erro ao criar plano de saúde");
      }
    )
  }
}
