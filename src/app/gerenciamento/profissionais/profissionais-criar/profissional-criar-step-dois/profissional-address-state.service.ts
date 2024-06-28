import {Injectable} from "@angular/core";
import {StateService} from "../../../../shared/services/state.service";
import {Profissional, ProfissionalAddres} from "../../../../core/models/Add/ProfissionalAdd.Model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfissionalAddressStateService extends StateService<ProfissionalAddres> {
  constructor() {
    super(new ProfissionalAddres());
  }

  setValue(addres: ProfissionalAddres): void {
    this.setState(addres);
  }

  getValue(): Observable<ProfissionalAddres> {
    return this.select(state => state);
  }
}
