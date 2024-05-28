import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServiceAdd } from 'src/app/core/models/Add/ServiceAdd.model';
import { ServiceService } from 'src/app/core/services/servicos.service';

@Component({
  selector: 'app-servico-criar',
  templateUrl: './servico-criar.component.html',
  styleUrls: ['./servico-criar.component.scss']
})
export class ServicoCriarComponent {

  ServicoForm: FormGroup;

  modalRef?: BsModalRef;
  imageURL: string | undefined;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.buildForm(new ServiceAdd());
  }

  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result)
      this.imageURL = reader.result as string;
      document.querySelectorAll('#member-img-add').forEach((element: any) => {
        element.src = this.imageURL;
      });
      this.ServicoForm.controls['image'].setValue(this.imageURL);
    }
    reader.readAsDataURL(file)
  }

  buildForm(service: ServiceAdd) {
    this.ServicoForm = this.formBuilder.group({
      Name: [service.Name, [Validators.required]],
      Description: [service.Description],
      price: [service.price],
      duration: [service.duration],
      image: [service.image],
    });
  }

  closeModal(){
    this.modalRef?.hide();
  }

  createPlanCard(){
    console.log(this.ServicoForm.value);
    this.serviceService.add(this.ServicoForm.value).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success("Servico criado com sucesso");
        this.closeModal();
      },
      error => {
        console.log(error);
        this.toastr.error("Erro ao criar plano de saúde");
      }
    )
  }
}
