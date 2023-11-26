import { Component, OnInit, Optional, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MembersService } from "../../services/members.service"; // Ajusta la ruta de tu servicio
import { SelectorsService } from "../../services/selectors.service";
import { forkJoin } from "rxjs";
import { Selector } from "../../models/selector.model";
import { map, startWith } from "rxjs/operators";
import { ControlsOf, Member, MemberForm } from "../../models/member.model";
import { MemberMapper, MemberRequestDTO } from "../../models/member.dto";
import { NbDialogRef, NbDialogService, NbToastrService } from "@nebular/theme";
import { InputTitlePipe } from "../../shared/pipes/input-title.pipe";
@Component({
  selector: "ngx-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
  queries: {
    dialog: new ViewChild("dialog")
  },
  providers: [InputTitlePipe]
})
export class DetailComponent implements OnInit {
  doingSomething: boolean = false;
  action: string = '';
  memberId: string = '';
  memberForm: FormGroup<ControlsOf<MemberForm>>;

  municipalities: Array<Selector> = [];
  occupations: Array<Selector> = [];
  socialNetworks: Array<Selector> = [];
  howKnow: Array<Selector> = [];
  sexs: Array<Selector> = [];
  members: Array<Member> = [];

  dialog: TemplateRef<any>;
  apiError: boolean = false;
  apiSuccess: boolean = false;
  apiErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private membersService: MembersService,
    private selectorsService: SelectorsService,
    private activatedRoute: ActivatedRoute,
    private _toastrService: NbToastrService,
    private _dialogService: NbDialogService,
    @Optional() protected _dialogRef: NbDialogRef<any>,
    private titleCasePipe: InputTitlePipe
  ) {
    this.getParams()
      .subscribe(params => {
        this.doingSomething = false;
        this.municipalities = params[0].data as Selector[];
        this.occupations = params[1].data as Selector[];
        this.socialNetworks = params[2].data as Selector[];
        this.howKnow = params[3].data as Selector[];
        this.sexs = params[4].data as Selector[];
      })

    this.memberForm = this.fb.group({
      names: ["", Validators.required],
      lastnames: ["", Validators.required],
      age: ["", Validators.required],
      sex: ["M", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.email],
      district: ["", Validators.required],
      volunteer: [false, Validators.required],
      municipality: new FormControl<number | Selector | null>(null, Validators.required),
      occupation: new FormControl<number | Selector | null>(null, Validators.required),
      socialNetwork: new FormControl<number | Selector | null>(null, Validators.required),
      howKnow: new FormControl<number | Selector | null>(null, Validators.required),
      active: [true, Validators.required],
    });

    this.municipaltiesControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'municipalities')),
      );
    this.occupationControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'occupation')),
      );
    this.socialNetworkControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'socialNetwork')),
      );
    this.howKnowControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'howKnow')),
      );
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
    this.namesControl.valueChanges.subscribe(() => {
      this.namesControl.patchValue(this.titleCasePipe.transform(this.namesControl.value), { emitEvent: false });
    })
    this.lastnamesControl.valueChanges.subscribe(() => {
      this.lastnamesControl.patchValue(this.titleCasePipe.transform(this.lastnamesControl.value), { emitEvent: false });
    })
  }

  get namesControl() {
    return this.memberForm.get('names') as FormControl;
  }
  get lastnamesControl() {
    return this.memberForm.get('lastnames') as FormControl;
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

  memberFormControlIsValid(controlName: string) {
    return this.memberForm.get(controlName).invalid && (this.memberForm.get(controlName).dirty || this.memberForm.get(controlName).touched)
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
        municipality: member.municipality,
        occupation: member.occupation,
        socialNetwork: member.socialNetwork,
        howKnow: member.howKnow,
        active: member.active,
      })
      this.memberForm.updateValueAndValidity();
      this.memberForm.markAllAsTouched();
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
      return this.members.filter(optionValue => optionValue.names.toLowerCase().includes(filterValue) || optionValue.lastnames.toLowerCase().includes(filterValue));
    }
  }

  viewHandle(value: Selector | Member | string) {
    if (typeof value == 'object' && (value as Selector).name) {
      return (value as Selector).name;
    } else if (typeof value == 'object' && (value as Member).names) {
      return (value as Member).names + ' ' + (value as Member).lastnames;
    }
    return value;
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

  getSumitTitle() {
    return this.action == 'edit' ? 'Actualizar' : 'Crear';
  }

  submit() {
    this.apiSuccess = false;
    this.apiError = false;
    this.apiErrorMessage = '';
    this.openLoading(this.dialog);
    const memberDTO: MemberRequestDTO = MemberMapper.toRequestDTO(this.memberForm.value as MemberForm);

    if (this.action == 'edit') {
      this.membersService.updateMember(this.memberId, memberDTO).subscribe(data => {
        this.apiSuccess = true;
      }, error => {
        this.apiError = true;
        this.apiErrorMessage = error;
      })
    } else {
      this.membersService.createMember(memberDTO).subscribe(data => {
        this.memberId = data.id as string;
        this.apiSuccess = true;
      }, error => {
        this.apiError = true;
        this.apiErrorMessage = error;
      })
    }

  }

  cancel() {
    this.router.navigate(['pages/members/all']);
  }

  showToast(message, position, status) {
    this._toastrService.show(
      status || 'Success',
      `Resultado: ${message}`,
      { position, status });
  }

  openLoading(dialog: TemplateRef<any>) {
    this._dialogRef = this._dialogService.open(
      dialog, {
      closeOnBackdropClick: false, closeOnEsc: false, context: { title: 'Ejecutando acción' }
    });
  }

  closeLoading() {
    this._dialogRef.close();
  }

  goList() {
    this.router.navigate([`pages/members/all`]);
    this.closeLoading();
  }

  seeItem() {
    this.router.navigate(
      [`pages/members/detail`],
      {
        queryParams: {
          id: this.memberId,
          action: 'edit'
        }
      });
    this.closeLoading();
  }
}
