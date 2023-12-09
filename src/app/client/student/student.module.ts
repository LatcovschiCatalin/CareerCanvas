import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentRoutingModule} from './student-routing.module';
import {StudentComponent} from './student.component';
import {HeaderComponent} from './header/header.component';
import {JobsComponent} from './jobs/jobs.component';
import {JobsListComponent} from './jobs/jobs-list/jobs-list.component';
import {FormsModule} from "@angular/forms";
import {FooterComponent} from './footer/footer.component';
import {SelectedJobsComponent} from './jobs/selected-jobs/selected-jobs.component';
import {JobDescriptionComponent} from './jobs/job-description/job-description.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { ProfileComponent } from './jobs/profile/profile.component';


@NgModule({
  declarations: [
    StudentComponent,
    HeaderComponent,
    JobsComponent,
    JobsListComponent,
    FooterComponent,
    SelectedJobsComponent,
    JobDescriptionComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class StudentModule {
}
