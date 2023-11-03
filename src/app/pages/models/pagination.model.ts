export class Metadata {
    total: number;
    perpage: number;
    page: number;
}

export class PageFilter {
    page: number;
    perPage: number;
}

export class FieldFilter {
    name?: string;
    names?: string;
    lastnames?: string;
    email?: string;
}