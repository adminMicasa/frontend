import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  constructor() {}

  getAllMembers() {
    const getData = {
      data: [
        {
          id: "Fabian Alberto3045772656",
          names: "Fabian Alberto",
          lastnames: "Ocampo Nieto",
          age: 33,
          phone: "3045772656",
          email: "fabianocampo@gmail.com",
          municipality: "Medellin",
          district: "Lomitas",
          occupation: "Empleado",
          volunteer: true,
          socialNetwork: "Instagram",
          howFindUs: "Amigos",
          discipleship: true,
          leaderDiscipleship: "Fabian Ocampo",
        },
        {
          id: "Fabian Camilo3045772656",
          names: "Fabian Camilo",
          lastnames: "Ocampo Nieto",
          age: 33,
          phone: "3045772656",
          email: "fabianocampo@gmail.com",
          municipality: "Medellin",
          district: "Lomitas",
          occupation: "Empleado",
          volunteer: true,
          socialNetwork: "Instagram",
          howFindUs: "Amigos",
          discipleship: true,
          leaderDiscipleship: "Fabian Ocampo",
        },
        {
          id: "Maria Paula3147203185",
          names: "Maria Paula",
          lastnames: "Clavijo Cano",
          age: 74,
          phone: "3147203185",
          email: "mpcc1126@gmail.com",
          municipality: "Medellin",
          district: "Lomitas",
          occupation: "Empleado",
          volunteer: true,
          socialNetwork: "Instagram",
          howFindUs: "Amigos",
          discipleship: true,
          leaderDiscipleship: "Andres Guerra",
        },
      ],
      total: 3,
    };
    return getData;
  }
}
