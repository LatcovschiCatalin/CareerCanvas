import {Component, OnInit} from '@angular/core';
import {Jobs} from "../../../../server/jobs/jobs";
import {JobsService} from "../../../../server/jobs/jobs.service";
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-selected-jobs',
  templateUrl: './selected-jobs.component.html',
  styleUrls: ['./selected-jobs.component.scss']
})
export class SelectedJobsComponent implements OnInit {

  jobs: any[] = []

  constructor(private usersService: UsersService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  deleteJob(id: string) {
    if (window.confirm('Are you sure you want to cancel the application?')) {
      this.usersService.deleteApply(id).subscribe(()=>{
        this.getData()
      })
    }
  }

  getData() {
    this.usersService.studentJobs().subscribe((data: any) => {
      this.jobs = data;
    });
  }

}
