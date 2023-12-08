import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentComponent} from "./student.component";
import {SelectedJobsComponent} from "./jobs/selected-jobs/selected-jobs.component";
import {JobDescriptionComponent} from "./jobs/job-description/job-description.component";

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
  },
  {
    path: 'job/:jobId',
    component: JobDescriptionComponent
  },
  {
    path: 'mylist',
    component: SelectedJobsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
