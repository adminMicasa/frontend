import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { AllMembersResponseDto, MemberRequestDTO } from "../models/member.dto";
import { pageFilter } from "../models/pagination.model";
import { Member } from "../models/member.model";
import { retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SchoolsService {
  constructor(
    private http: HttpClient,
  ) { }

  getSchools(id: string | number) {
    return this.http.get<Member>(
      environment.micasa.urlApi + environment.micasa.endpointMembers + '/' + id,
    ).pipe(
      retry(1)
    );
  }
}