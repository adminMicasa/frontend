import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from '../../services/members.service'; // Ajusta la ruta de tu servicio
import { Observable } from 'rxjs';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  memberForm: FormGroup;
  memberData: any; // Variable para almacenar los datos del miembro

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private membersService: MembersService // Asegúrate de inyectar tu servicio
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMemberData();
  }

  private initForm(): void {
    this.memberForm = this.formBuilder.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      municipality: [''],
      district: [''],
      occupation: [''],
      volunteer: [false],
      socialNetwork: [''],
      howFindUs: [''],
      leaderDiscipleship: ['']
    });
  }

  private loadMemberData(): void {
    // const memberId = this.route.snapshot.paramMap.get('id'); // Obtén el ID del miembro de la ruta
    // this.memberData = this.membersService.getAllMembers().subscribe(membersData =>{
    //   console.log(membersData)
    // }) 
    
    // data.find(member => member.id === memberId);

    if (this.memberData) {
      // Si encontramos los datos del miembro, establecemos los valores en el formulario
      this.memberForm.patchValue(this.memberData);
    }
  }

  submitForm(): void {
    if (this.memberForm.valid) {
   
      const formData = this.memberForm.value;
      console.log(formData);
    }
  }
}
