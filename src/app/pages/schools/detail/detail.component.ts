import { Component, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf, SchoolForm } from '../../models/school.model';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectorsService } from '../../services/selectors.service';
import { Step } from '../../models/step.model';
import { SchoolMapper, SchoolsRequestDTO } from '../../models/school.dto';
import { SchoolsService } from '../../services/schools.service';
import { forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Selector } from '../../models/selector.model';
import { LocalDataSource } from 'ng2-smart-table';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  queries: {
    dialog: new ViewChild("dialog"),
    dialog_member: new ViewChild("dialog_member")
  },
})
export class DetailComponent implements OnInit {
  doingSomething: boolean = false;
  action: string = '';

  schoolId: string = '';
  schoolForm: FormGroup<ControlsOf<SchoolForm>>;

  steps: Array<Step> = [];
  filteredSteps: Array<Step> = [];

  dialog: TemplateRef<any>;
  dialog_member: TemplateRef<any>;
  apiSuccess: boolean = false;
  apiError: boolean = false;
  apiErrorMessage: string = '';
  loadingMemberData: boolean = false;
  apiSuccessMember: boolean = false;
  apiErrorMember: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private schoolService: SchoolsService,
    private selectorsService: SelectorsService,
    private activatedRoute: ActivatedRoute,
    private _toastrService: NbToastrService,
    private _dialogService: NbDialogService,
    private membersService: MembersService,
    @Optional() protected _dialogRef: NbDialogRef<any>,
    @Optional() protected _dialogMemberRef: NbDialogRef<any>,

  ) {
    this.schoolForm = this.fb.group({
      name: ["", Validators.required],
      step: new FormControl<number | Step | null>(null, Validators.required),
      startDate: new FormControl<string | null | Date>(null, Validators.required),
      endDate: new FormControl<string | null | Date>(null, Validators.required),
      active: [true, Validators.required],
    });
    this.stepControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString, 'steps')),
      ).subscribe(filter => {
        debugger
        this.filteredSteps = filter as Step[]
      });
    this.getParams()
      .subscribe(params => {
        this.doingSomething = false;

        this.steps = params[0].data as Step[];
        this.filteredSteps = params[0].data as Step[];

      })
  }

  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      edit: false,
      add: false,
    },
    delete: {
      deleteButtonContent: '<i title="Eliminar" class="nb-trash"></i>',
      confirmDelete: true,
    },
    rowClassFunction: (row) => {
      if (row?.data?.active) {
        return '';
      } else {
        return 'hide-action';
      }
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
        title: "Teléfono",
        type: "string",
      },
      email: {
        title: "Correo",
        type: "string",
      },
      volunteer: {
        title: 'Voluntario',
        type: 'html',
        width: '10%',
        valuePrepareFunction: (cell, row) => {
          let handler = row.volunteer;
          if (handler) {
            return `<div class="text-center"> <i  class="fas fa-check-circle btn-success"></i> </div>`
          } else {
            return ` <div  class="text-center"> <i class="fas fa-times-circle btn-danger" ></i> </div>`
          }
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
      active: {
        title: 'Activo',
        type: 'html',
        width: '10%',
        sortDirection: 'desc',
        valuePrepareFunction: (cell, row) => {
          let handler = row.active;
          if (handler) {
            return `<div class="text-center"> <i  class="fas fa-check-circle btn-success"></i> </div>`
          } else {
            return ` <div  class="text-center"> <i class="fas fa-times-circle btn-danger" ></i> </div>`
          }
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
  settingsMembersFiltered = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      delete: false,
      add: false,
    },
    rowClassFunction: (row) => {
      if (row?.data?.active) {
        return '';
      } else {
        return 'hide-action';
      }
    },
    edit: {
      editButtonContent: '<i title="Asociar al curso" class="nb-plus"></i>',
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
        title: "Teléfono",
        type: "string",
      },
      email: {
        title: "Correo",
        type: "string",
      },
      volunteer: {
        title: 'Voluntario',
        type: 'html',
        width: '10%',
        valuePrepareFunction: (cell, row) => {
          let handler = row.volunteer;
          if (handler) {
            return `<div class="text-center"> <i  class="fas fa-check-circle btn-success"></i> </div>`
          } else {
            return ` <div  class="text-center"> <i class="fas fa-times-circle btn-danger" ></i> </div>`
          }
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
      active: {
        title: 'Activo',
        type: 'html',
        width: '10%',
        sortDirection: 'desc',
        valuePrepareFunction: (cell, row) => {
          let handler = row.active;
          if (handler) {
            return `<div class="text-center"> <i  class="fas fa-check-circle btn-success"></i> </div>`
          } else {
            return ` <div  class="text-center"> <i class="fas fa-times-circle btn-danger" ></i> </div>`
          }
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
    pager: { perPage: 5 }
  };
  settingsClasses = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      delete: false,
      add: false,
      edit: false,
    },
    rowClassFunction: (row) => {
      if (row?.data?.active) {
        return '';
      } else {
        return 'hide-action';
      }
    },
    columns: {
      numberClass: {
        title: "Número de clase",
        type: "string",
        width: '10%',
      },
      topicName: {
        title: "Topico",
        type: "string",
      },
      classDate: {
        title: "Fecha",
        type: "string",
        width: '20%',
        valuePrepareFunction: (cell, row) => {
          if (!row.classDate) {
            return ``
          }
          const date = new Date(row.classDate);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          return `${year}-${month}-${day}`
        }
      },
    },
    pager: { perPage: 5 }
  };
  source: LocalDataSource = new LocalDataSource();
  sourceMembersFiltered: LocalDataSource = new LocalDataSource();
  sourceClasses: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.doingSomething = true;
    this.activatedRoute.queryParams.pipe().subscribe(
      queryParams => {
        this.schoolId = queryParams.id;
        this.action = queryParams.action;

        if (!this.action) {
          this.router.navigate(['pages/schools']);
          return;
        }
        if (this.action == 'edit' && this.schoolId) {
          this.setSchoolForm();
          this.setSchoolMembersTable();
          this.setSchoolClassTable();
        } else if (this.action == 'create') {
        }
      }
    )
  }

  get stepControl() {
    return this.schoolForm.get('step') as FormControl;
  }

  showElements(id: string) {
    var autoCompleteElement = document.getElementById(id);
    if (autoCompleteElement) {
      autoCompleteElement.click();
      autoCompleteElement.focus();
    }
  }

  resetSelector(selector: string) {
    if (selector.includes('step')) {
      if (!this.stepControl.value) {
        return;
      }
      let index = this.steps.findIndex(data => data.id == this.stepControl.value.id);
      let element = this.steps.splice(index, 1)[0];
      this.steps.sort((a, b) => a.name.localeCompare(b.name));
      this.steps.unshift(element);
      this.filteredSteps = this.steps;
    }
  }

  schoolsFormControlIsValid(controlName: string) {
    return this.schoolForm.get(controlName).invalid && (this.schoolForm.get(controlName).dirty || this.schoolForm.get(controlName).touched)
  }

  cancel() {
    this.router.navigate(['pages/schools/all']);
  }

  showToast(message, position, status) {
    this._toastrService.show(
      status || 'Success',
      `Resultado: ${message}`,
      { position, status });
  }

  openLoading() {
    this._dialogRef = this._dialogService.open(
      this.dialog, {
      closeOnBackdropClick: false, closeOnEsc: false, context: { title: 'Ejecutando acción' }
    });
  }

  closeLoading() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
  }

  openMemberDialog() {
    this.cleanDialogs();
    this.loadingMemberData = true;
    this._dialogRef = this._dialogService.open(
      this.dialog_member, {
      closeOnBackdropClick: true, closeOnEsc: true, context: {}, hasScroll: true,
    });
    this.membersService.getAllMembers({ page: 1, perPage: -1 }).subscribe(membersData => {
      this.sourceMembersFiltered.load(membersData.data);
      this.loadingMemberData = false;

    })
  }

  closeMemberDialog() {
    if (this._dialogMemberRef) {
      this._dialogMemberRef.close();
    }
  }

  goList() {
    this.router.navigate([`pages/schools/all`]);
    this.closeLoading();
  }

  seeItem() {
    this.router.navigate(
      [`pages/schools/detail`],
      {
        queryParams: {
          id: this.schoolId,
          action: 'edit'
        }
      });
    this.closeLoading();
  }

  cleanDialogs() {
    this.closeLoading();
    this.closeMemberDialog();
  }

  cleanApiValitators() {
    this.apiErrorMessage = '';
    this.apiError = false;
    this.apiSuccess = false;
    this.apiErrorMember = false;
    this.apiSuccessMember = false;
  }

  setSchoolForm() {
    this.schoolService.getSchool(this.schoolId).subscribe(school => {
      debugger
      this.schoolForm.patchValue({
        name: school.name,
        startDate: school.startDate ? new Date(school.startDate) : null,
        endDate: school.endDate ? new Date(school.endDate) : null,
        step: school.step,
        active: school.active,
      })
      this.schoolForm.updateValueAndValidity();
      this.schoolForm.markAllAsTouched();
    })
  }

  setSchoolMembersTable() {
    this.schoolService.getEnrollmentCourses(this.schoolId).subscribe(enrollmentCourses => {
      this.source.load(enrollmentCourses.map(en => ({
        ...en,
        names: en.member.names,
        lastnames: en.member.lastnames,
        phone: en.member.phone,
        email: en.member.email,
        volunteer: en.member.volunteer,
        active: en.member.active
      })));
    })
  }

  setSchoolClassTable() {
    this.schoolService.getClassCourses(this.schoolId).subscribe(classes => {
      this.sourceClasses.load(classes.map(cl => ({
        ...cl,
        topicName: cl.topicId.topic,
        courseName: cl.courseId.name,
        courseStartDate: cl.courseId.startDate,
        courseEndDate: cl.courseId.endDate,
      })));
    })
  }

  filter(value: string | Step, source: string): Selector[] | Step[] {
    let filterValue = '';
    if (typeof value == 'object' && (value as Selector)?.name) {
      filterValue = (value as Selector)?.name?.toLowerCase();
    } else if (typeof value == 'object' && (value as Step)?.name) {
      filterValue = (value as Step)?.name?.toLowerCase();
    } else if (typeof value == 'string') {
      filterValue = value?.toLowerCase();
    }
    if (source.includes('step')) {
      return this.steps.filter(optionValue => optionValue.name.toLowerCase().includes(filterValue));
    }

  }

  viewHandle(value: Step | string) {
    if (typeof value == 'object' && (value as Step).name) {
      return (value as Step).name;
    }
    return value;
  }

  getSumitTitle() {
    return this.action == 'edit' ? 'Actualizar' : 'Crear';
  }

  getParams() {
    const params = [
      this.selectorsService.getAllSteps(),
    ]
    return forkJoin(params);
  }

  onEdit(ev: any) {
    this.router.navigate(['pages/members/detail'], { queryParams: { action: 'edit', id: ev.data.id } });
  }

  onAdd(ev: any) {
    this.openMemberDialog();
  }

  onDelete(ev: any) {
    if (!window.confirm(`Esta seguro de querer eliminar el miembro: ${ev.data?.member?.names} ?`)) {
      return;
    }
    this.schoolService.deleteEnrollmentCourses(ev.data.id).subscribe(deleted => {
      this.showToast(`Acción ejecutada!`, 'top-right', 'success');
      this.setSchoolMembersTable();
    })
  }

  onAddMemberFiltered(ev: any) {
    this.cleanDialogs();
    this.cleanApiValitators()
    this.openLoading();
    this.schoolService.addEnrollmentCourses({
      courseId: parseInt(this.schoolId),
      memberId: ev?.data?.id,
      state: 'activa'
    }).subscribe(data => {
      this.apiSuccessMember = true;
      this.setSchoolMembersTable();
    }, error => {
      this.apiErrorMember = true;
      this.apiErrorMessage = error;
    })
  }

  validateApi() {
    return (!this.apiSuccess && !this.apiError) && (!this.apiSuccessMember && !this.apiErrorMember)
  }

  validateApiSuccess() {
    return (this.apiSuccess) || (this.apiSuccessMember);
  }

  validateApiError() {
    return (this.apiError) || (this.apiErrorMember);
  }

  submit() {
    this.cleanApiValitators();
    this.openLoading();
    const schoolDTO: SchoolsRequestDTO = SchoolMapper.toRequestDTO(this.schoolForm.value as SchoolForm);

    if (this.action == 'edit') {
      this.schoolService.updateSchool(this.schoolId, schoolDTO).subscribe(data => {
        this.apiSuccess = true;
      }, error => {
        this.apiError = true;
        this.apiErrorMessage = error;
      })
    } else {
      this.schoolService.createSchool(schoolDTO).subscribe(data => {
        this.schoolId = data.id as string;
        this.apiSuccess = true;
      }, error => {
        this.apiError = true;
        this.apiErrorMessage = error;
      })
    }
  }
}
