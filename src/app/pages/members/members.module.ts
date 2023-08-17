import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MembersComponent } from './members.component';
import { MembersRoutingModule } from './members-routing.module';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    AllComponent,
    MembersComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    MembersRoutingModule
  ]
})
export class MembersModule { }
