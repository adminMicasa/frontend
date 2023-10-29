import { FormControl, FormGroup } from "@angular/forms";
import { Selector } from "./selector.model";
export interface MemberForm extends Member {
}
export interface Member {
  id?: number | string;
  names: string;
  lastnames: string;
  age: string;
  sex: string;
  phone: string;
  email: string;
  district: string;
  volunteer: boolean;
  municipality: number | Selector | null;
  occupation: number | Selector | null;
  socialNetwork: number | Selector | null;
  howKnow: number | Selector | null;
  active: boolean;
}

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};
