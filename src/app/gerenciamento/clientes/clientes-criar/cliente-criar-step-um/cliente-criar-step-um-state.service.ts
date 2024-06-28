import {Injectable} from "@angular/core";
import {StateService} from "../../../../shared/services/state.service";
import {Observable} from "rxjs";
import {Client} from "../../../../core/models/Add/ClienteAdd.Model";

@Injectable({
  providedIn: 'root'
})
export class ClienteCriarStepUmStateService extends StateService<Client> {
  constructor() {
    super(new Client());
  }

  setValue(dadosCliente: Client): void {
    this.setState(dadosCliente);
  }

  getValue(): Observable<Client> {
    return this.select(state => state);
  }
}
