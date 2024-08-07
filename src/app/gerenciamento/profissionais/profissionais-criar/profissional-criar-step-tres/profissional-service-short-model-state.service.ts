import {Injectable} from "@angular/core";
import {StateService} from "../../../../shared/services/state.service";
import {ProfissionalServiceShortModel} from "../../../../core/models/Add/ProfissionalAdd.Model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfissionalServiceShortModelStateService extends StateService<ProfissionalServiceShortModel> {
  constructor() {
    super(new ProfissionalServiceShortModel());
  }

  setValue(data: ProfissionalServiceShortModel): void {
    this.setState(data);
  }

  getValue(): Observable<ProfissionalServiceShortModel> {
    return this.select(state => state);
  }
}
