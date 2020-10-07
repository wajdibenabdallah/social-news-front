export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  phone: Phone;
  email: string;
  password: string;
  birthdate: Date;
}

export interface Phone {
  number: number;
  country: number;
}
