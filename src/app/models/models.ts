export interface Person {
    key: string;
    name: string;
    age: number;
    address: string;
    mascotas: Pet[];
  }

export interface Pet {
  propietario: string
  id: string;
  name: string;
  raza: string;
  age:number;
}  