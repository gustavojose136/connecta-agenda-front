import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { NgModule } from "@angular/core";
import { PlanoSaudeComponent } from "./plano-saude/plano-saude.component";
import { ServicosComponent } from "./servicos/servicos.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ProfissionaisComponent } from "./profissionais/profissionais.component";

const routes: Routes = [
  {
    path: "plano-saude",
    component: PlanoSaudeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "servico",
    component: ServicosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "clientes",
    component: ClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profissionais",
    component: ProfissionaisComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciamentoRoutingModule {}
