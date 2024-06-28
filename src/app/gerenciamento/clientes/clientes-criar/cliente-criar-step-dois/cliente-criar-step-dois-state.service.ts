import {Injectable} from "@angular/core";
import {StateService} from "../../../../shared/services/state.service";
import {ClientAddres} from "../../../../core/models/Add/ClienteAdd.Model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteCriarStepDoisStateService extends StateService<ClientAddres> {
  constructor() {
    super(new ClientAddres());
  }

  setValue(data: ClientAddres): void {
    this.setState(data);
  }

  getValue(): Observable<ClientAddres> {
    return this.select(state => state);
  }
}

