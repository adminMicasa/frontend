import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllComponent } from "./all/all.component";
import { SchoolsComponent } from "./schools.component";
import { DetailComponent } from "./detail/detail.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTooltipModule } from "@nebular/theme";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule as ngFormsModule } from '@angular/forms';
import { SchoolsRoutingModule } from "./schools-routing.module";
import { NbDateFnsDateModule } from "@nebular/date-fns";

@NgModule({
  declarations: [AllComponent, SchoolsComponent, DetailComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    SchoolsRoutingModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    ngFormsModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbCheckboxModule,
    NbSelectModule,
    NbAutocompleteModule,
    NbFormFieldModule,
    NbRadioModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbDatepickerModule,
    NbTabsetModule],
})
export class SchoolsModule { }
