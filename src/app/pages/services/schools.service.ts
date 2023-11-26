import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { PageFilter } from "../models/pagination.model";
import { delay, retry } from "rxjs/operators";
import { SchoolsRequestDTO } from "../models/school.dto";
import { School } from "../models/school.model";
import { EnrollmentCourse } from "../models/enrollmentsCourses.model";

@Injectable({
  providedIn: "root",
})
export class SchoolsService {
  constructor(private http: HttpClient) { }

  getSchool(id: string | number) {
    return this.http.get<School>(
      environment.micasa.urlApi + environment.micasa.endpointSchools + '/' + id,
    ).pipe(
      retry(2),
      delay(500),
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
      .pipe(
        retry(2),
        delay(500),
      );
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

  getEnrollmentCourses(courseId: string, pagination?: PageFilter) {
    return this.http
      .get<EnrollmentCourse[]>(
        environment.micasa.urlApi + environment.micasa.endpointenrollmentCoursesByCourseId + '/' + courseId,
        {
          params: {
            ...pagination,
          },
        }
      )
      .pipe(
        retry(2),
        delay(500),
      );
  }

  addEnrollmentCourses(addEnrollmentRequestDto: { courseId: number | string, memberId: number | string, state: string }) {
    return this.http
      .post<EnrollmentCourse>(
        environment.micasa.urlApi + environment.micasa.endpointenrollmentCourses,
        addEnrollmentRequestDto
      );
  }

  deleteEnrollmentCourses(enrollmentId: number | string) {
    return this.http
      .delete<EnrollmentCourse[]>(
        environment.micasa.urlApi + environment.micasa.endpointenrollmentCourses + '/' + enrollmentId
      );
  }

}
