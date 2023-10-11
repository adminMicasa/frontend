import { FormControl, FormGroup } from "@angular/forms";
import { Selector } from "./selector.model";
 
export class School {
    name: string;
    stepId: number;
    startDate: string;
    endDate: string;
}

export type ControlsOf<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
  };