import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PlanCardFilter } from 'src/app/core/models/filter/planCardFilter.model';
import { PlanCardService } from 'src/app/core/services/planCard.service';
import { PlanoSaudeCriarComponent } from '../plano-saude/plano-saude-criar/plano-saude-criar.component';
import { PlanoSaudeEditarComponent } from '../plano-saude/plano-saude-editar/plano-saude-editar.component';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent {

  lists: any;

  paginationTotalItems: number;
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
    this.buildForm(new PlanCardFilter());
    this.getAllPlanCards();
  }

  getAllPlanCards(){
    this.spinner.show();
    if(this.filterForm.value.IsActive == "null") this.filterForm.value.IsActive = null;

    this.planCardService.getAll(this.filterForm.value).subscribe(
      (data) =>{
        console.log(data);
        this.lists = data.data;
        this.paginationTotalItems = data.total;
        console.log(this.lists);
        this.spinner.hide(); // Move esta linha aqui
      },
      (error) => {
        console.error('Ocorreu um erro ao obter os planos de saúde:', error);
        this.spinner.hide(); // Certifique-se de ocultar o spinner em caso de erro também
      }
    );
  }


  buildForm(filter: PlanCardFilter) {
    this.filterForm = this.formBuilder.group({
      Name: [filter.Name],
      IsActive: [filter.IsActive],
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
  }

  openAdicionarPlanoSaudeModal(){
    this.modalRef = this.modalService.show(PlanoSaudeCriarComponent, {
      class: "modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md modal-scrollable",
    });
  }

  openEditarPlanoSaudeModal(planCard){
    this.modalRef = this.modalService.show(PlanoSaudeEditarComponent, {
      initialState: { planBeUpdated: planCard},
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
