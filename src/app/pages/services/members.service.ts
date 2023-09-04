import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  AllMembersResponse,
  CreateMemberRequest,
  Member,
} from "../models/member.model";
import { environment } from "../../../environments/environment";
import { ErrorHandlerService } from "./error-handler.service";

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
    return this.http.get<AllMembersResponse>(
      environment.micasa.urlApi + environment.micasa.endpointMembers
    ).pipe(this.errorHandlerService.handleHttpError('getAllMembers'));
  }

  createMember(member: CreateMemberRequest) {
    return this.http.post<Member>(
      environment.micasa.urlApi,
      member
    );
  }

  deleteMember(id: number) {
    return this.http.delete<any>(environment.micasa.urlApi + '/' + id
    )
  }
}
