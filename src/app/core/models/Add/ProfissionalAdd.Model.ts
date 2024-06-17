export class ProfissionalAddModel {
  profissionalData: Profissional = new Profissional();
  profissionalAddres: ProfissionalAddres = new ProfissionalAddres();
  profissionalServices?: ProfissionalServiceShortModel[];
}

export class Profissional {
  name?: string;
  socialName?: string;
  email?: string;
  password?: string;
  gender?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  birthDate?: Date;
  isAdmin?: boolean;
  image?: Uint8Array;
  worksDays?: string;
}

export class ProfissionalAddres {
  name: string = "";
  street: string = "";
  neighborhood?: string;
  number: string = "";
  city: string = "";
  zipCode: string = "";
  state: string = "";
  country: string = "";
  observation?: string;
}

export class ProfissionalServiceShortModel {
  serviceId?: string;
  price: number = 0;
  description?: string;
  duration?: number;
}
