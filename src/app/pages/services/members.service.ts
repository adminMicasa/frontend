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
export class MembersService {
  constructor(
    private http: HttpClient,
  ) { }

  getMember(id: string | number) {
    return this.http.get<Member>(
      environment.micasa.urlApi + environment.micasa.endpointMembers + '/' + id,
    ).pipe(
      retry(1)
    );
  }

  getAllMembers(pagination: pageFilter) {
    return this.http.get<AllMembersResponseDto>(
      environment.micasa.urlApi + environment.micasa.endpointMembers,
      {
        params: {
          ...pagination
        }
      }
    ).pipe(
      retry(1)
    );
  }

  createMember(member: MemberRequestDTO) {
    return this.http.post<Member>(
      environment.micasa.urlApi + environment.micasa.endpointMembers,
      member
    )
  }

  updateMember(memberId: string | number, member: MemberRequestDTO) {
    return this.http.put<Member>(
      environment.micasa.urlApi + environment.micasa.endpointMembers + '/' + memberId,
      member
    )
  }
  deleteMember(id: number) {
    return this.http.delete<any>(environment.micasa.urlApi + environment.micasa.endpointMembers + '/' + id
    );
  }
}
