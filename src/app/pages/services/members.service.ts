import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { ErrorHandlerService } from "./error-handler.service";
import { AllMembersResponseDto, MemberRequestDTO } from "../models/member.dto";
import { pageFilter } from "../models/pagination.model";
import { Member } from "../models/member.model";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getMember(id: string | number) {
    return this.http.get<Member>(
      environment.micasa.urlApi + environment.micasa.endpointMembers + '/' + id,
    ).pipe(this.errorHandlerService.handleHttpError('getMember'));
  }

  getAllMembers(pagination: pageFilter) {
    return this.http.get<AllMembersResponseDto>(
      environment.micasa.urlApi + environment.micasa.endpointMembers,
      {
        params: {
          ...pagination
        }
      }
    ).pipe(this.errorHandlerService.handleHttpError('getAllMembers'));
  }

  createMember(member: MemberRequestDTO) {
    return this.http.post<Member>(
      environment.micasa.urlApi + environment.micasa.endpointMembers,
      member
    )
  }

  deleteMember(id: number) {
    return this.http.delete<any>(environment.micasa.urlApi + '/' + id
    )
  }
}
