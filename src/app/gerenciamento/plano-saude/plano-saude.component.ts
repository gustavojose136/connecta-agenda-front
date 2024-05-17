import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PlanCardService } from 'src/app/core/services/planCard.service';
import { PlanoSaudeCriarComponent } from './plano-saude-criar/plano-saude-criar.component';

@Component({
  selector: 'app-plano-saude',
  templateUrl: './plano-saude.component.html',
  styleUrls: ['./plano-saude.component.scss']
})
export class PlanoSaudeComponent {

  lists: any;

  paginationPage: number;
  paginasVisiveis: number;
  currentPage: number;

  filterForm: FormGroup;

  modalRef?: BsModalRef;

  tableHeaders = [
    "Id Do Plano De Saude",
    "Nome Do Plano",
    "Descrição",
    "Ativo",
    "Usuário que crioou",
    "Data de criação"
  ];

  constructor(
    private planCardService: PlanCardService,
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
  ){

  }

  ngOnInit(){
    this.getAllPlanCards();
  }

  getAllPlanCards(){
    this.spinner.show();
    this.planCardService.getAll().subscribe(
      (data) =>{
        console.log(data)
        this.lists = data;
        console.log(this.lists);
      }
    )
    this.spinner.hide();
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
  }

  openAdicionarPlanoSaudeModal(){
    this.modalRef = this.modalService.show(PlanoSaudeCriarComponent, {
      class: "modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md modal-scrollable",
    });
  }

  copyText(text: string) {
    navigator.clipboard.writeText(text);
    this.toastr.success("Texto copiado com sucesso");
  }

  clearFilter(){
    console.log("Limpo")
  }
}
