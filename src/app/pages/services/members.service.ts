import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { ErrorHandlerService } from "./error-handler.service";
import { AllMembersResponseDto, MemberRequestDTO, MemberResponseDTO } from "../models/member.dto";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  getData: any;
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getAllMembers() {
    return this.http.get<AllMembersResponseDto>(
      environment.micasa.urlApi + environment.micasa.endpointMembers
    ).pipe(this.errorHandlerService.handleHttpError('getAllMembers'));
  }

  createMember(member: MemberRequestDTO) {
    return this.http.post<MemberResponseDTO>(
      environment.micasa.urlApi + environment.micasa.endpointMembers,
      member
    );
  }

  deleteMember(id: number) {
    return this.http.delete<any>(environment.micasa.urlApi + '/' + id
    )
  }
}
