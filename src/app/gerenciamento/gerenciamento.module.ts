import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from '../shared/ui/ui.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UiSwitchModule } from "ngx-ui-switch";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { GerenciamentoRoutingModule } from './gerenciamento-routing.module';
import { PlanoSaudeComponent } from './plano-saude/plano-saude.component';
import { PlanoSaudeEditarComponent } from './plano-saude/plano-saude-editar/plano-saude-editar.component';
import { PlanoSaudeCriarComponent } from './plano-saude/plano-saude-criar/plano-saude-criar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServicosComponent } from './servicos/servicos.component';

@NgModule({
  declarations: [
    PlanoSaudeComponent,
    PlanoSaudeEditarComponent,
    PlanoSaudeCriarComponent,
    ServicosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UIModule,
    UiSwitchModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    GerenciamentoRoutingModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GerenciamentoModule { }
