import { School } from "./school.model";
import { Selector } from "./selector.model";
import { Metadata } from "./pagination.model";
import { MemberForm } from "./member.model"
import { FormControl, FormGroup } from "@angular/forms";


export class AllSchoolsResponseDto {
    data: Array<School> = [];
    metadata: Metadata;
}


export class SchoolsRequestDTO {
    
    name: string;
    stepId: number;
    active: true;
    startDate: string;
    endDate: string;
  }

  export class SchoolMapper {
    static toRequestDTO(school: School): SchoolsRequestDTO {
      const request: SchoolsRequestDTO = new SchoolsRequestDTO();
      request.name = school. name;
      request.stepId = school.stepId;
      request.startDate = school.startDate;
      request.endDate = school.endDate;
      return request;
    }
  
    static froRequestDTO(dto: SchoolsRequestDTO): School {
      const school: School = new School();
      school.name = dto.name;
      school.stepId = dto.stepId;
      school.startDate= dto.startDate;
      school.endDate= dto.endDate;
      return school;
    }
  }
  
