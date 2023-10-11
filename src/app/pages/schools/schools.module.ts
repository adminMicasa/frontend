import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllComponent } from "./all/all.component";
import { SchoolsComponent } from "./schools.component";
import { DetailComponent } from "./detail/detail.component";
import { SchoolsRoutingModule } from "./schools-routing.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbCardModule, NbIconLibraries, NbIconModule } from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";

@NgModule({
  declarations: [AllComponent, SchoolsComponent, DetailComponent],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbIconModule,
    NbEvaIconsModule 
  ],
})
export class SchoolsModule {}
