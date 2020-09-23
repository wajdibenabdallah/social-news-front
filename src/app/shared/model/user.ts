export interface User {
  firstname: string;
  lastname: string;
  phone: Phone;
  email: string;
  password: string;
}

export interface Phone {
  number: number;
  country: number;
}
