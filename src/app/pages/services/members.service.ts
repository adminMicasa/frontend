import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  AllMembersResponse,
  CreateMemberRequest,
  Member,
} from "../models/member.model";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  getData: any;
  constructor(private http: HttpClient) {}

  getAllMembers() {
    return this.http.get<AllMembersResponse>(
      "https://serverlessmicasamed.azurewebsites.net/api/members"
    );
  }

  createMember(member: CreateMemberRequest) {
    return this.http.post<Member>(
      "https://serverlessmicasamed.azurewebsites.net/api/members",
      member
    );
  }

  deleteMember(id:number){
    return this.http.delete<any>("https://serverlessmicasamed.azurewebsites.net/api/members/"+ id

    )
  }
}
