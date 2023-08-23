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
    mode:'external',
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
        title: "First Name",
        type: "string",
      },
      lastnames: {
        title: "Last Name",
        type: "string",
      },
      phone: {
        title: "Phone",
        type: "string",
      },
      email: {
        title: "E-mail",
        type: "string",
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router,private membersService:MembersService ) {}

  ngOnInit(): void {
   this.getAllMembers()
  }

  getAllMembers(){
    this.membersService.getAllMembers().subscribe(membersData =>{
      console.log(membersData)
      this.source.load(membersData.data);
    }) 
  }

  onAdd(ev) {
    console.log("ADD->", ev);
    this.router.navigate(['pages/members/detail']);
  }

  onDelete(ev){
    console.log("DEL->",ev.data.id)
    this.membersService.deleteMember(ev.data.id).subscribe(deleted =>{
      console.log(deleted)
      this.getAllMembers()
    })
  }

}
