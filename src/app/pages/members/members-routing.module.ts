import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members.component';
import { AllComponent } from './all/all.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    children: [
      {
        path: 'all',
        component: AllComponent,
      },
      {
        path: 'detail',
        component: DetailComponent,
      },
    ],
  },
];

    
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class MembersRoutingModule { }
