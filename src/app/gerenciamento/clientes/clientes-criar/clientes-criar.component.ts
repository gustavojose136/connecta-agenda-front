import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfissionalAddModel } from 'src/app/core/models/Add/ProfissionalAdd.Model';
import { ProfissionalService } from 'src/app/core/services/profissional.service';

@Component({
  selector: 'app-clientes-criar',
  templateUrl: './clientes-criar.component.html',
  styleUrls: ['./clientes-criar.component.scss']
})
export class ClientesCriarComponent {
  breadCrumbItems: Array<{}>;

  addForm: FormGroup;

  imageURL: string | undefined;

  ClienteData: any = {};

  ClienteAddres: any = {};

  ClienteSeguro: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ProfissionalService
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Clientes' }, { label: 'Cadastrar Clientes', active: true }];

    this.buildForm(new ProfissionalAddModel());
  }

  buildForm(filter: ProfissionalAddModel) {
    this.addForm = this.formBuilder.group({
      clienteData: this.ClienteData,
      clienteAddres: this.ClienteAddres,
      clienteSeguro: this.ClienteSeguro
    });
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
      // this.ServicoForm.controls['image'].setValue(this.imageURL);
    }
    reader.readAsDataURL(file)
  }

  onUserFormChange(data: any) {
    this.ClienteData = data;
    console.log('Dados do formulário em tempo real:', this.ClienteData);
  }

  onUserAddresFormChange(data: any) {
    this.ClienteAddres = data;
    console.log('Dados do formulário em tempo real:', this.ClienteAddres);
  }

  onUserServicesFormChange(data: any) {
    this.ClienteSeguro = data;
    console.log('Dados do formulário em tempo real:', this.ClienteSeguro);
  }

  createClient() {
    this.ClienteData.image = this.imageURL;

    this.addForm.value.clienteData = this.ClienteData;
    this.addForm.value.clienteAddres = this.ClienteAddres;
    this.addForm.value.clienteSeguro = this.ClienteSeguro.lenght > 0 ? this.ClienteSeguro : null;

    console.log(this.addForm.value);

    try {
      this.clienteService.create(this.addForm.value).subscribe((res) => {
        console.log(res);
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}
