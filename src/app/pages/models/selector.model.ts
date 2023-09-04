import { Metadata } from "./pagination.model";

export class Selector {
    id: number | string;
    name: string;
}

export class AllSelectorsResponse {
    data: Array<Selector>;
    metadata: Metadata;
}
