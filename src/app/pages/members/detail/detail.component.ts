import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MembersService } from "../../services/members.service"; // Ajusta la ruta de tu servicio
import { MembersModule } from "../members.module";

@Component({
  selector: "ngx-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  memberForm: FormGroup;
  memberData: any; // Variable para almacenar los datos del miembro

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private membersService: MembersService
  ) {}

  ngOnInit(): void {
    this.memberForm = this.fb.group({
      names: ["", Validators.required],
      lastnames: ["", Validators.required],
      age: ["", Validators.required],
      phone: [""],
      email: [""],
      municipality: [""],
      district: [""],
      occupation: [""],
      volunteer: [true],
      socialNetwork: [""],
      howFindUs: [""],
      discipleship: [true],
      leaderDiscipleship: [""],
    });
  }

  submit() {
    console.log(this.memberForm.value);
    this.membersService.createMember(this.memberForm.value).subscribe(data=>{
      console.log(data)
    })
  }
}
