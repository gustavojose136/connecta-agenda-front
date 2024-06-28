export class ClientAddModel {
  ClientData: Client = new Client();
  ClientAddress: ClientAddres = new ClientAddres();
  ClientPlans?: ClientPlans[];
}

export class Client {
  Name?: string;
  SocialName?: string;
  Email?: string;
  Password?: string;
  Gender?: string;
  Phone?: string;
  Cpf?: string;
  Rg?: string;
  BirthDate?: Date;
  IsAdmin?: boolean;
  Image?: Uint8Array;
}

export class ClientAddres {
  Name: string = "";
  Street: string = "";
  Neighborhood?: string;
  Number: string = "";
  City: string = "";
  ZipCode: string = "";
  State: string = "";
  Country: string = "";
  Observation?: string;
}

export class ClientPlans {
  IdPlanCard: string = "";
  PlanCardNumber: string = "";
}
