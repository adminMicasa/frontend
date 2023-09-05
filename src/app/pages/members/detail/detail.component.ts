import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MembersService } from "../../services/members.service"; // Ajusta la ruta de tu servicio
import { SelectorsService } from "../../services/selectors.service";
import { forkJoin } from "rxjs";
import { Selector } from "../../models/selector.model";
import { Observable, of } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { ControlsOf, MemberForm } from "../../models/member.model";
import { MemberMapper, MemberRequestDTO } from "../../models/member.dto";
@Component({
  selector: "ngx-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  memberForm: FormGroup<ControlsOf<MemberForm>>;

  municipalities: Array<Selector> = [];
  filteredMunicipalities: Array<Selector> = [];
  occupations: Array<Selector> = [];
  filteredOccupations: Array<Selector> = [];
  socialNetworks: Array<Selector> = [];
  filteredSocialNetworks: Array<Selector> = [];
  howKnow: Array<Selector> = [];
  filteredHowKnow: Array<Selector> = [];
  sexs: Array<Selector> = [];
  filteredSexs: Array<Selector> = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private membersService: MembersService,
    private selectorsService: SelectorsService,
  ) {
    this.getParams()
      .subscribe(params => {
        console.log(params)
        this.municipalities = params[0].data;
        this.filteredMunicipalities = params[0].data;

        this.occupations = params[1].data;
        this.filteredOccupations = params[1].data;

        this.socialNetworks = params[2].data;
        this.filteredSocialNetworks = params[2].data;

        this.howKnow = params[3].data;
        this.filteredHowKnow = params[4].data;

        this.sexs = params[4].data;
        this.filteredSexs = params[4].data;

      })

    this.memberForm = this.fb.group({
      names: ["", Validators.required],
      lastnames: ["", Validators.required],
      age: ["", Validators.required],
      sex: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      district: ["", Validators.required],
      volunteer: [true],
      discipleship: [true],
      municipality: [null],
      occupation: [null],
      socialNetwork: [null],
      howKnow: [null],
      discipleshipLeader: [null],
    });
  }

  ngOnInit(): void {
    this.municipaltiesControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'municipalities')),
      ).subscribe(filter => {
        this.filteredMunicipalities = filter
      });
    this.occupationControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'occupation')),
      ).subscribe(filter => {
        this.filteredOccupations = filter
      });
    this.socialNetworkControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'socialNetwork')),
      ).subscribe(filter => {
        this.filteredSocialNetworks = filter
      });
    this.howKnowControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'howKnow')),
      ).subscribe(filter => {
        this.filteredHowKnow = filter
      });

  }

  get municipaltiesControl() {
    return this.memberForm.get('municipality') as FormControl;
  }
  get occupationControl() {
    return this.memberForm.get('occupation') as FormControl;
  }
  get socialNetworkControl() {
    return this.memberForm.get('socialNetwork') as FormControl;
  }
  get howKnowControl() {
    return this.memberForm.get('howKnow') as FormControl;
  }
  get discipleshipLeaderControl() {
    return this.memberForm.get('discipleshipLeader') as FormControl;
  }

  private filter(value: string | Selector, source: string): Selector[] {
    let filterValue = '';
    if (typeof value == 'object' && value.name) {
      filterValue = value?.name?.toLowerCase();
    } else if (typeof value == 'string') {
      filterValue = value?.toLowerCase();
    }
    if (source.includes('municipalities')) {
      return this.municipalities.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
    }
    if (source.includes('occupation')) {
      return this.occupations.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
    }
    if (source.includes('socialNetwork')) {
      return this.socialNetworks.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
    }
    if (source.includes('howKnow')) {
      return this.howKnow.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
    }
    if (source.includes('discipleshipLeader')) {
      return this.municipalities.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
    }
  }

  viewHandle(value: Selector | string) {
    if (typeof value == 'object' && value.name) {
      return value.name;
    }
    return value;
  }

  resetSelector(selector: string) {
    if (selector.includes('municipality')) {
      if (!this.municipaltiesControl.value) {
        return;
      }
      let index = this.municipalities.findIndex(data => data.id == this.municipaltiesControl.value.id);
      let element = this.municipalities.splice(index, 1)[0];
      this.municipalities.sort((a, b) => a.name.localeCompare(b.name));
      this.municipalities.unshift(element);
      this.filteredMunicipalities = this.municipalities;
    }
    if (selector.includes('occupation')) {
      if (!this.occupationControl.value) {
        return;
      }
      let index = this.occupations.findIndex(data => data.id == this.occupationControl.value.id);
      let element = this.occupations.splice(index, 1)[0];
      this.occupations.sort((a, b) => a.name.localeCompare(b.name));
      this.occupations.unshift(element);
      this.filteredOccupations = this.occupations;
    }
    if (selector.includes('socialNetwork')) {
      if (!this.socialNetworkControl.value) {
        return;
      }
      let index = this.socialNetworks.findIndex(data => data.id == this.socialNetworkControl.value.id);
      let element = this.socialNetworks.splice(index, 1)[0];
      this.socialNetworks.sort((a, b) => a.name.localeCompare(b.name));
      this.socialNetworks.unshift(element);
      this.filteredSocialNetworks = this.socialNetworks;
    }
    if (selector.includes('howKnow')) {
      if (!this.howKnowControl.value) {
        return;
      }
      let index = this.howKnow.findIndex(data => data.id == this.howKnowControl.value.id);
      let element = this.howKnow.splice(index, 1)[0];
      this.howKnow.sort((a, b) => a.name.localeCompare(b.name));
      this.howKnow.unshift(element);
      this.filteredHowKnow = this.howKnow;
    }
  }

  getParams() {
    const params = [
      this.selectorsService.getAllMunicipalities(),
      this.selectorsService.getAllOccupations(),
      this.selectorsService.getAllSocialNetworks(),
      this.selectorsService.getAllHowKnow(),
      this.selectorsService.getAllSexs(),
    ]
    return forkJoin(params);
  }

  showElements(id: string) {
    var autoCompleteElement = document.getElementById(id);
    if (autoCompleteElement) {
      autoCompleteElement.click();
      autoCompleteElement.focus();
    }
  }

  submit() {
    console.log(this.memberForm.value);
    const memberDTO: MemberRequestDTO = MemberMapper.toRequestDTO(this.memberForm.value as MemberForm);
    this.membersService.createMember(memberDTO).subscribe(data => {
      console.log(data)
    })
  }

  cancel() {
    this.router.navigate(['pages/members/all']);
  }
}
