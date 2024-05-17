import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { NgModule } from "@angular/core";
import { PlanoSaudeComponent } from "./plano-saude/plano-saude.component";

const routes: Routes = [
  {
    path: "plano-saude",
    component: PlanoSaudeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciamentoRoutingModule {}
