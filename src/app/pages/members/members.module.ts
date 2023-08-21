import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MembersComponent } from './members.component';
import { MembersRoutingModule } from './members-routing.module';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { MembersService } from '../services/members.service';

@NgModule({
  declarations: [
    AllComponent,
    MembersComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    MembersRoutingModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbCardModule,
    ngFormsModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule
  ],
  providers: [
    MembersService
  ]
})
export class MembersModule { }