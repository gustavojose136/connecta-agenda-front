import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfissionalAddModel } from 'src/app/core/models/Add/ProfissionalAdd.Model';
import { ProfissionalService } from 'src/app/core/services/profissional.service';

@Component({
  selector: 'app-profissionais-criar',
  templateUrl: './profissionais-criar.component.html',
  styleUrls: ['./profissionais-criar.component.scss']
})
export class ProfissionaisCriarComponent {
  breadCrumbItems: Array<{}>;

  addForm: FormGroup;

  imageURL: string | undefined;

  ProfissionalData: any = {};

  ProfissionalAddres: any = {};

  ProfissionalServices: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private profissionalService: ProfissionalService
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Profissionais' }, { label: 'Cadastrar Profissional', active: true }];

    this.buildForm(new ProfissionalAddModel());
  }

  buildForm(filter: ProfissionalAddModel) {
    this.addForm = this.formBuilder.group({
      profissionalData: this.ProfissionalData,
      profissionalAddres: this.ProfissionalAddres,
      profissionalServices: this.ProfissionalServices
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
    this.ProfissionalData = data;
    console.log('Dados do formulário em tempo real:', this.ProfissionalData);
  }

  onUserAddresFormChange(data: any) {
    this.ProfissionalAddres = data;
    console.log('Dados do formulário em tempo real:', this.ProfissionalAddres);
  }

  onUserServicesFormChange(data: any) {
    this.ProfissionalServices = data;
    console.log('Dados do formulário em tempo real:', this.ProfissionalServices);
  }

  createProfissional() {
    this.ProfissionalData.image = this.imageURL;

    this.addForm.value.profissionalData = this.ProfissionalData;
    this.addForm.value.ProfissionalAddres = this.ProfissionalAddres;
    this.addForm.value.ProfissionalServices = this.ProfissionalServices.lenght > 0 ? this.ProfissionalServices : null;

    console.log(this.addForm.value);

    try {
      this.profissionalService.create(this.addForm.value).subscribe((res) => {
        console.log(res);
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}
