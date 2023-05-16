import { CarsDataType } from "./CarsDataType";
export interface ButtonCarType {
  name: keyof CarsDataType;
  path: string;
}
