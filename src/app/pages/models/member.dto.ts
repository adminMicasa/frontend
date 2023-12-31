import { Selector } from "./selector.model";
import { Metadata } from "./pagination.model";
import { Member, MemberForm } from "./member.model";
import { formatISO } from "date-fns";

export class AllMembersResponseDto {
  data: Array<Member> = [];
  metadata: Metadata;
}

export class MemberRequestDTO {
  id?: number;
  names: string;
  lastnames: string;
  age: string;
  sex: string;
  phone: string;
  email: string;
  district: string;
  volunteer: boolean;
  municipalityId: string | number;
  occupationId: string | number;
  socialNetworkId: string | number;
  howKnowId: string | number;
  active: boolean;
  arrivalDate: string;
  comment: string;
}

export class MemberMapper {
  static toRequestDTO(member: MemberForm): MemberRequestDTO {
    const request: MemberRequestDTO = new MemberRequestDTO();
    request.names = member.names;
    request.lastnames = member.lastnames;
    request.age = member.age;
    request.sex = member.sex;
    request.phone = member.phone;
    request.email = member.email;
    request.district = member.district;
    request.volunteer = member.volunteer;
    request.municipalityId = (member.municipality as Selector)?.id;
    request.occupationId = (member.occupation as Selector)?.id;
    request.socialNetworkId = (member.socialNetwork as Selector)?.id;
    request.howKnowId = (member.howKnow as Selector)?.id;
    request.arrivalDate = member.arrivalDate ? formatISO(member.arrivalDate as Date, { representation: 'complete' }) : null;
    request.comment = member.comment;
    request.active = member.active;
    return request;
  }
}
