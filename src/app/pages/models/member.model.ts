export class Member {
  id?: number;
  names: string;
  lastnames: string;
  age: string;
  phone: string;
  email: string;
  municipality: string;
  district: string;
  occupation: string;
  volunteer: boolean;
  socialNetwork: string;
  howFindUs: string;
  discipleship: boolean;
  leaderDiscipleship: string;
}

export class AllMembersResponse {
  data: Array<Member> = [];
  total: number;
}
