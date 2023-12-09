import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { AllMembersResponseDto, MemberRequestDTO } from "../models/member.dto";
import { PageFilter } from "../models/pagination.model";
import { Member } from "../models/member.model";
import { delay, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  constructor(
    private http: HttpClient,
  ) { }

  getMember(id: string | number) {
    return this.http.get<Member>(
      environment.micasa.urlApi + '/members/' + id,
    ).pipe(
      retry(2),
      delay(500),
    );
  }

  getAllMembers(pagination: PageFilter) {
    return this.http.get<AllMembersResponseDto>(
      environment.micasa.urlApi + '/members',
      {
        params: {
          ...pagination
        }
      }
    ).pipe(
      retry(2),
      delay(500),
    );
  }

  createMember(member: MemberRequestDTO) {
    return this.http.post<Member>(
      environment.micasa.urlApi + '/members',
      member
    )
  }

  updateMember(memberId: string | number, member: MemberRequestDTO) {
    return this.http.put<Member>(
      environment.micasa.urlApi + '/members/' + memberId,
      member
    )
  }

  deleteMember(memberId: number) {
    return this.http.delete<any>(environment.micasa.urlApi + '/members/' + memberId
    );
  }

}
