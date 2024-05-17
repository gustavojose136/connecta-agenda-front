import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class PlanCardService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>( environment.apiAddress + `PlanCard`);
    }

    add(PlanCard) {
        return this.http.post(environment.apiAddress + `PlanCard`, PlanCard);
    }
}
