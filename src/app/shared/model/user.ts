export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  phone: Phone;
  phonealid: boolean;
  email: string;
  emailValid: boolean;
  password: string;
  birthdate: Date;
}

export interface Phone {
  number: number;
  country: number;
}
