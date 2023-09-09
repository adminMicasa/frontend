import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { SmartTableData } from "../../../@core/data/smart-table";
import { Router } from "@angular/router";
import { MembersService } from "../../services/members.service";

@Component({
  selector: "ngx-all",
  templateUrl: "./all.component.html",
  styleUrls: ["./all.component.scss"],
})
export class AllComponent implements OnInit {
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {

      names: {
        title: "Nombres",
        type: "string",
      },
      lastnames: {
        title: "Apellidos",
        type: "string",
      },
      phone: {
        title: "Telefono",
        type: "string",
      },
      email: {
        title: "Correo",
        type: "string",
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router, private membersService: MembersService) { }

  ngOnInit(): void {
    this.getAllMembers()
  }

  getAllMembers() {
    this.membersService.getAllMembers({ page: 1, perPage: -1 }).subscribe(membersData => {
      console.log(membersData)
      this.source.load(membersData.data);
    })
  }

  onAdd(ev: any) {
    this.router.navigate(['pages/members/detail'], { queryParams: { action: 'create' } });
  }

  onEdit(ev: any) {
    this.router.navigate(['pages/members/detail'], { queryParams: { action: 'edit', id: ev.data.id } });
  }

  onDelete(ev: any) {
    console.log("DEL->", ev.data.id)
    this.membersService.deleteMember(ev.data.id).subscribe(deleted => {
      console.log(deleted)
      this.getAllMembers()
    })
  }

}
