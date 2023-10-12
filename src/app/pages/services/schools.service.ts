import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { AllMembersResponseDto, MemberRequestDTO } from "../models/member.dto";
import { PageFilter } from "../models/pagination.model";
import { Member } from "../models/member.model";
import { retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SchoolsService {
  constructor(private http: HttpClient) {}

  getAllSchools(pagination: PageFilter) {
    return this.http
      .get<any>(
        environment.micasa.urlApi + environment.micasa.endpointSchools,
        {
          params: {
            ...pagination,
          },
        }
      )
      .pipe(retry(1));
  }
}
