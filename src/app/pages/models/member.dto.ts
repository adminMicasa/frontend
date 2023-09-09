import { Selector } from "./selector.model";
import { Metadata } from "./pagination.model";
import { Member, MemberForm } from "./member.model";

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
    discipleship: boolean;
    municipalityId: string | number;
    occupationId: string | number;
    socialNetworkId: string | number;
    howKnowId: string | number;
    leaderDiscipleshipId: string | number;
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
        request.discipleship = member.discipleship;
        request.municipalityId = (member.municipality as Selector)?.id;
        request.occupationId = (member.occupation as Selector)?.id;
        request.socialNetworkId = (member.socialNetwork as Selector)?.id;
        request.howKnowId = (member.howKnow as Selector)?.id;

        return request;
    }
}