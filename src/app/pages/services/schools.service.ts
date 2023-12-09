import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { PageFilter } from "../models/pagination.model";
import { delay, retry } from "rxjs/operators";
import { SchoolsRequestDTO } from "../models/school.dto";
import { School } from "../models/school.model";
import { EnrollmentCourse } from "../models/enrollmentsCourses.model";
import { ClassCourse } from "../models/classesCourses.model";

@Injectable({
  providedIn: "root",
})
export class SchoolsService {
  constructor(private http: HttpClient) { }

  getSchool(id: string | number) {
    return this.http.get<School>(
      environment.micasa.urlApi + '/courses/' + id,
    ).pipe(
      retry(2),
      delay(500),
    );
  }

  getAllSchools(pagination: PageFilter) {
    return this.http
      .get<any>(
        environment.micasa.urlApi + '/courses',
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
      environment.micasa.urlApi + '/courses',
      school
    )
  }

  updateSchool(schoolId: string | number, school: SchoolsRequestDTO) {
    return this.http.put<School>(
      environment.micasa.urlApi + '/courses/' + schoolId,
      school
    )
  }

  deleteSchool(id: number) {
    return this.http.delete<any>(environment.micasa.urlApi + '/courses/' + id
    );
  }

  getEnrollmentCourses(courseId: string, pagination?: PageFilter) {
    return this.http
      .get<EnrollmentCourse[]>(
        environment.micasa.urlApi + '/enrollmentCourses/byCourseId/' + courseId,
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
        environment.micasa.urlApi + '/enrollmentCourses',
        addEnrollmentRequestDto
      );
  }

  deleteEnrollmentCourses(enrollmentId: number | string) {
    return this.http
      .delete<EnrollmentCourse[]>(
        environment.micasa.urlApi + '/enrollmentCourses/' + enrollmentId
      );
  }

  getClassCourses(courseId: string, pagination?: PageFilter) {
    return this.http
      .get<ClassCourse[]>(
        environment.micasa.urlApi + '/coursesClasses/byCourseId/' + courseId,
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

}
