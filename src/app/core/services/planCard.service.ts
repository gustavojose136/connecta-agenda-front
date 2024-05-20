import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PlanCardFilter } from "../models/filter/planCardFilter.model";

@Injectable({ providedIn: 'root' })
export class PlanCardService {
  constructor(private http: HttpClient) { }

  getAll(filter: PlanCardFilter) {
    return this.http.get<any>(
      environment.apiAddress + `PlanCard?` +
      (filter.Name ? `Name=${filter.Name}&&` : '') +
      (filter.IsActive ? `IsActive=${filter.IsActive}&&` : '')
    );
  }

  add(PlanCard) {
    return this.http.post(environment.apiAddress + `PlanCard`, PlanCard);
  }

  update(PlanCard) {
    return this.http.put(environment.apiAddress + `PlanCard`, PlanCard);
  }
}
