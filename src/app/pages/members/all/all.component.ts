import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { SmartTableData } from "../../../@core/data/smart-table";
import { Router } from "@angular/router";
import { MembersService } from "../../services/members.service";
import { NbToastrService } from "@nebular/theme";

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
      addButtonContent: '<i title="Crear nuevo" class="nb-plus"></i>',
    },
    edit: {
      editButtonContent: '<i title="Editar" class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i title="Desactivar" class="nb-close-circled"></i>',
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
      active: {
        title: 'Activo',
        type: 'html',
        width: '10%',
        valuePrepareFunction: (cell, row) => {
          let handler = row.active;
          if (handler)
            return `<div class="text-center"> <i  class="fas fa-check-circle btn-success"></i> </div>`
          return ` <div  class="text-center"> <i class="fas fa-times-circle btn-danger" ></i> </div>`
        },
        filter: {
          type: 'checkbox',
          config: {
            true: 'true',
            false: 'false',
            resetText: 'clear',
          },
        },

      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router: Router,
    private membersService: MembersService,
    private _toastrService: NbToastrService,
  ) { }

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
    if (!window.confirm(`Esta seguro de querer desactivar el miembro: ${ev.data.names} ?`)) {
      return;
    }
    console.log("DEL->", ev.data.id)
    this.membersService.deleteMember(ev.data.id).subscribe(deleted => {
      this.showToast(`Acción ejecutada!`, 'top-right', 'success');
      this.getAllMembers();
    })
  }

  showToast(message, position, status) {
    this._toastrService.show(
      status || 'Success',
      `Resultado: ${message}`,
      { position, status });
  }

}
