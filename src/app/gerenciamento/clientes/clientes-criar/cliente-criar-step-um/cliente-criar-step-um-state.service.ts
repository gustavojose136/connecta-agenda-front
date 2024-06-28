import {Injectable} from "@angular/core";
import {StateService} from "../../../../shared/services/state.service";
import {Observable} from "rxjs";
import {Profissional} from "../../../../core/models/Add/ProfissionalAdd.Model";

@Injectable({
  providedIn: 'root'
})
export class ClienteCriarStepUmStateService extends StateService<Profissional> {
  constructor() {
    super(new Profissional());
  }

  setValue(dadosCliente: Profissional): void {
    this.setState(dadosCliente);
  }

  getValue(): Observable<Profissional> {
    return this.select(state => state);
  }
}
