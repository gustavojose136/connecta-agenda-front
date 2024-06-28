import {Injectable} from "@angular/core";
import {StateService} from "../../../../shared/services/state.service";
import {ClientPlans} from "../../../../core/models/Add/ClienteAdd.Model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteCriarStepTresStateService extends StateService<ClientPlans> {
  constructor() {
    super(new ClientPlans());
  }

  setValue(data: ClientPlans): void {
    this.setState(data);
  }

  getValue(): Observable<ClientPlans> {
    return this.select(state => state);
  }
}

