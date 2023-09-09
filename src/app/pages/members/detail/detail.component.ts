import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MembersService } from "../../services/members.service"; // Ajusta la ruta de tu servicio
import { SelectorsService } from "../../services/selectors.service";
import { forkJoin } from "rxjs";
import { Selector } from "../../models/selector.model";
import { Observable, of } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { ControlsOf, Member, MemberForm } from "../../models/member.model";
import { MemberMapper, MemberRequestDTO } from "../../models/member.dto";
@Component({
  selector: "ngx-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  doingSomething: boolean = false;
  action: string = '';
  memberId: string = '';
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
  members: Array<Member> = [];
  filteredMembers: Array<Member> = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private membersService: MembersService,
    private selectorsService: SelectorsService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.getParams()
      .subscribe(params => {
        this.doingSomething = false;

        console.log(params)
        this.municipalities = params[0].data as Selector[];
        this.filteredMunicipalities = params[0].data as Selector[];

        this.occupations = params[1].data as Selector[];
        this.filteredOccupations = params[1].data as Selector[];

        this.socialNetworks = params[2].data as Selector[];
        this.filteredSocialNetworks = params[2].data as Selector[];

        this.howKnow = params[3].data as Selector[];
        this.filteredHowKnow = params[3].data as Selector[];

        this.sexs = params[4].data as Selector[];
        this.filteredSexs = params[4].data as Selector[];

        this.members = params[5].data as Member[];
        this.filteredMembers = params[5].data as Member[];
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

    this.municipaltiesControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'municipalities')),
      ).subscribe(filter => {
        this.filteredMunicipalities = filter as Selector[]
      });
    this.occupationControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'occupation')),
      ).subscribe(filter => {
        this.filteredOccupations = filter as Selector[]
      });
    this.socialNetworkControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'socialNetwork')),
      ).subscribe(filter => {
        this.filteredSocialNetworks = filter as Selector[]
      });
    this.howKnowControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'howKnow')),
      ).subscribe(filter => {
        this.filteredHowKnow = filter as Selector[]
      });
    this.discipleshipLeaderControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'discipleshipLeader')),
      ).subscribe(filter => {
        this.filteredMembers = filter as Member[]
      });

  }

  ngOnInit(): void {
    this.doingSomething = true;
    this.activatedRoute.queryParams.pipe().subscribe(
      queryParams => {
        this.memberId = queryParams.id;
        this.action = queryParams.action;

        if (!this.action) {
          this.router.navigate(['pages/members']);
          return;
        }
        if (this.action == 'edit' && this.memberId) {
          this.setMemberForm();

        } else if (this.action == 'create') {
        }
      }
    )

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


  setMemberForm() {
    this.membersService.getMember(this.memberId).subscribe(member => {
      this.memberForm.patchValue({
        names: member.names,
        lastnames: member.lastnames,
        age: member.age,
        sex: member.sex,
        phone: member.phone,
        email: member.email,
        district: member.district,
        volunteer: member.volunteer,
        discipleship: member.discipleship,
        municipality: member.municipality,
        occupation: member.occupation,
        socialNetwork: member.socialNetwork,
        howKnow: member.howKnow,
        discipleshipLeader: member.discipleshipLeader
      })
    })

  }

  filter(value: string | Selector | Member, source: string): Selector[] | Member[] {
    let filterValue = '';
    if (typeof value == 'object' && (value as Selector)?.name) {
      filterValue = (value as Selector)?.name?.toLowerCase();
    } else if (typeof value == 'object' && (value as Member)?.names) {
      filterValue = (value as Member)?.names?.toLowerCase();
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
      return this.members.filter(optionValue => optionValue.names.toLowerCase().includes(filterValue));
    }
  }

  viewHandle(value: Selector | Member | string) {
    if (typeof value == 'object' && (value as Selector).name) {
      return (value as Selector).name;
    } else if (typeof value == 'object' && (value as Member).names) {
      return (value as Member).names;
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
    if (selector.includes('discipleshipLeader')) {
      if (!this.discipleshipLeaderControl.value) {
        return;
      }
      let index = this.members.findIndex(data => data.id == this.discipleshipLeaderControl.value.id);
      let element = this.members.splice(index, 1)[0];
      this.members.sort((a, b) => a.names.localeCompare(b.names));
      this.members.unshift(element);
      this.filteredMembers = this.members;
    }
  }

  getParams() {
    const params = [
      this.selectorsService.getAllMunicipalities(),
      this.selectorsService.getAllOccupations(),
      this.selectorsService.getAllSocialNetworks(),
      this.selectorsService.getAllHowKnow(),
      this.selectorsService.getAllSexs(),
      this.membersService.getAllMembers({ page: 1, perPage: -1 })
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
