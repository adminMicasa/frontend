import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { PageFilter } from "../models/pagination.model";
import { retry } from "rxjs/operators";
import { SchoolsRequestDTO } from "../models/school.dto";
import { School } from "../models/school.model";

@Injectable({
  providedIn: "root",
})
export class SchoolsService {
  constructor(private http: HttpClient) { }

  getSchool(id: string | number) {
    return this.http.get<School>(
      environment.micasa.urlApi + environment.micasa.endpointSchools + '/' + id,
    ).pipe(
      retry(1)
    );
  }

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

  createSchool(school: SchoolsRequestDTO) {
    return this.http.post<School>(
      environment.micasa.urlApi + environment.micasa.endpointSchools,
      school
    )
  }

  updateSchool(schoolId: string | number, school: SchoolsRequestDTO) {
    return this.http.put<School>(
      environment.micasa.urlApi + environment.micasa.endpointSchools + '/' + schoolId,
      school
    )
  }

  deleteSchool(id: number) {
    return this.http.delete<any>(environment.micasa.urlApi + environment.micasa.endpointSchools + '/' + id
    );
  }

}
