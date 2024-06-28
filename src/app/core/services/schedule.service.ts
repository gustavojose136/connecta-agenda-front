import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ScheduleFilter } from "../models/filter/scheduleFilter.model";
import { OrderAddModel } from "../models/Add/ScheduleAdd.Model";

@Injectable({ providedIn: 'root' })
export class ScheduleService {
    constructor(private http: HttpClient) { }

    get(filter: ScheduleFilter) {
        return this.http.get<any>(environment.apiAddress +
          `Schedule?`+
          (filter.id ? `Id=${filter.id}&&` : '') +
          (filter.profissionalServiceId ? `profissionalServiceId=${filter.profissionalServiceId}&&` : '') +
          (filter.clientId ? `clientId=${filter.clientId}&&` : '') +
          (filter.companyId ? `companyId=${filter.companyId}&&` : '') +
          (filter.startDate ? `startDate=${filter.startDate}&&` : '') +
          (filter.paymentMethod ? `paymentMethod=${filter.paymentMethod}&&` : '') +
          (filter.planCardId ? `planCardId=${filter.planCardId}&&` : '') +
          (filter.isPaid ? `isPaid=${filter.isPaid}&&` : '') +
          (filter.isPlanCoop ? `isPlanCoop=${filter.isPlanCoop}&&` : ''));
    }

    add(schedule: OrderAddModel) {
        return this.http.post(environment.apiAddress + `Schedule`, schedule);
    }
}
