import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AllMembersResponse } from "../models/member.model";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  getData: any;
  constructor(private http: HttpClient) {
  }

  getAllMembers() {
    return this.http.get<AllMembersResponse>('http://localhost:3000/api/members?page=1&perPage=10');
  }
}
