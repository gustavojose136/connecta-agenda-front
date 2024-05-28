import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ServiceFilter } from "../models/filter/ServiceFilter.model";

@Injectable({ providedIn: 'root' })
export class ServiceService {
  constructor(private http: HttpClient) { }

  getAll(filter: ServiceFilter) {
    return this.http.get<any>(
      environment.apiAddress + `Service?` +
      (filter.Name ? `Name=${filter.Name}&&` : '') +
      (filter.IsActive ? `IsActive=${filter.IsActive}&&` : '')
    );
  }

  add(Service) {
    return this.http.post(environment.apiAddress + `Service`, Service);
  }

  update(Service) {
    return this.http.put(environment.apiAddress + `Service`, Service);
  }
}
