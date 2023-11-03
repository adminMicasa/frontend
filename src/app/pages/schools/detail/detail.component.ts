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

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  queries: {
    dialog: new ViewChild("dialog")
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
  apiError: boolean = false;
  apiSuccess: boolean = false;
  apiErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private schoolService: SchoolsService,
    private selectorsService: SelectorsService,
    private activatedRoute: ActivatedRoute,
    private _toastrService: NbToastrService,
    private _dialogService: NbDialogService,
    @Optional() protected _dialogRef: NbDialogRef<any>,

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
          this.setMemberForm();
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

  setMemberForm() {
    this.schoolService.getSchool(this.schoolId).subscribe(school => {
      debugger
      this.schoolForm.patchValue({
        name: school.name,
        startDate: new Date(school.startDate),
        endDate: new Date(school.endDate),
        step: school.step,
        active: school.active,
      })
      this.schoolForm.updateValueAndValidity();
      this.schoolForm.markAllAsTouched();
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

  submit() {
    this.apiSuccess = false;
    this.apiError = false;
    this.apiErrorMessage = '';
    this.openLoading(this.dialog);
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
