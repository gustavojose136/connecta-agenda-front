import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/auth.models";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ProfissionalService {
    constructor(private http: HttpClient) { }

    create(profissional) {
        return this.http.post<any>(environment.apiAddress + `Profissional`, profissional);
    }
}
