import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { SmartTableData } from "../../../@core/data/smart-table";
import { Router } from "@angular/router";
import { MembersService } from "../../services/members.service";
import { NbIconModule, NbToastrService, NbIconLibraries } from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";

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
      name: {
        title: "Escuela",
        type: "string",
      },
      stepId: {
        title: "Id",
        type: "string",
      },
      startDate: {
        title: "Fecha de inicio",
        type: "string",
      },
      endDate: {
        title: "fecha de finalizacion",
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
  
   /* "name": "string",
    "stepId": 0,
    "active": true,
    "startDate": "2023-09-25T18:41:51.900Z",
    "endDate": "2023-09-25T18:41:51.900Z"
  }*/

  source: LocalDataSource = new LocalDataSource();

  constructor(
    nbEvaIconsModule: NbEvaIconsModule,
    nbIconLibraries: NbIconLibraries,
    private service: SmartTableData,
    private router: Router,
    private _toastrService: NbToastrService
  ) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  ngOnInit(): void {}
}
