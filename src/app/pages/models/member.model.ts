import { FormControl, FormGroup } from "@angular/forms";
export interface MemberForm extends Member {
}
export interface Member {
  names: string;
  lastnames: string;
  age: string;
  sex: string;
  phone: string;
  email: string;
  district: string;
  volunteer: boolean;
  discipleship: boolean;
  municipality: number | Selector | null;
  occupation: number | Selector | null;
  socialNetwork: number | Selector | null;
  howKnow: number | Selector | null;
  discipleshipLeader: number | Selector | null;
}

export interface Selector {
  id: number;
  name: string;
}

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};
