import { Metadata } from "./pagination.model";

export class Step {
    id:  number | string;
    name: string;
    classCount:number;
}

export class AllStepResponse {
  data: Array<Step>;
  metadata: Metadata;
}
