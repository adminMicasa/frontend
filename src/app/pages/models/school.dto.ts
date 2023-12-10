import { School } from "./school.model";
import { Metadata } from "./pagination.model";
import { Step } from "./step.model";
import { formatISO } from 'date-fns'

export class AllSchoolsResponseDto {
  data: Array<School> = [];
  metadata: Metadata;
}

export class SchoolsRequestDTO {
  name: string;
  stepId: string | number;
  startDate: string;
  endDate: string;
  active: boolean;
}

export class SchoolMapper {
  static toRequestDTO(school: School): SchoolsRequestDTO {
    const request: SchoolsRequestDTO = new SchoolsRequestDTO();
    request.name = school.name;
    request.stepId = (school.step as Step).id;
    request.startDate = school.startDate ? formatISO(school.startDate as Date, { representation: 'complete' }) : null;
    request.endDate = school.endDate ? formatISO(school.endDate as Date, { representation: 'complete' }) : null;
    request.active = school.active;
    return request;
  }

}

