import { FormControl, FormGroup } from "@angular/forms";
import { Step } from "./step.model";

export interface SchoolForm extends School {
}

export class School {
  id?: number | string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  step: number | Step | null;
  active: boolean;
}

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};
