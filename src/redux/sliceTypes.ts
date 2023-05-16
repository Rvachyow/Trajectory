import { CarsDataType } from "../types/CarsDataType";

export interface CarsDataSliceType {
  data: CarsDataType[] | [];
  filtered: CarsDataType[] | [];
  status: "loading" | "loaded";
  isSorted: boolean;
}
