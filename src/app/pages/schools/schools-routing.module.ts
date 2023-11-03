import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SchoolsComponent} from "./schools.component";
import { AllComponent } from "./all/all.component";
import { DetailComponent } from "./detail/detail.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SchoolsComponent,
    children: [
      {
        path: "all",
        component: AllComponent,
      },
      {
        path: "detail",
        component: DetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolsRoutingModule {}
