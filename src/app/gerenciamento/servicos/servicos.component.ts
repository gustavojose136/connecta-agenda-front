import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PlanoSaudeEditarComponent } from '../plano-saude/plano-saude-editar/plano-saude-editar.component';
import { ServiceFilter } from 'src/app/core/models/filter/ServiceFilter.model';
import { ServiceService } from 'src/app/core/services/servicos.service';
import { ServicoCriarComponent } from './servico-criar/servico-criar.component';

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
    // "Id Do Servico",
    "Nome",
    "Descrição",
    "Duracao",
    "Preco",
    "Ativo",
    "Usuário que crioou",
    "Data de criação"
  ];

  constructor(
    private Service: ServiceService,
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
  ){

  }

  ngOnInit(){
    this.buildForm(new ServiceFilter());
    this.getAllServicos();
  }

  getAllServicos(){
    this.spinner.show();
    if(this.filterForm.value.IsActive == "null") this.filterForm.value.IsActive = null;

    this.Service.getAll(this.filterForm.value).subscribe(
      (data) =>{
        console.log(data);
        this.lists = data.data;
        this.lists.forEach(el => {
          if (el.image != null && el.image != '') {
              el.image = 'data:image/png;base64,' + el.image;
          }
        });

        this.paginationTotalItems = data.total;
        console.log(this.lists);
        this.spinner.hide();
      },
      (error) => {
        console.error('Ocorreu um erro ao obter os Servicos:', error);
        this.spinner.hide();
      }
    );
  }


  buildForm(filter: ServiceFilter) {
    this.filterForm = this.formBuilder.group({
      Name: [filter.Name],
      IsActive: [filter.IsActive],
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
  }

  openAdicionarServicoModal(){
    this.modalRef = this.modalService.show(ServicoCriarComponent, {
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
