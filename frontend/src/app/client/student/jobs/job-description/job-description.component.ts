import {Component, OnInit} from '@angular/core';
import {Jobs} from "../../../../server/jobs/jobs";
import {JobsService} from "../../../../server/jobs/jobs.service";
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

interface User {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {

  jobCard!: any;

  constructor(private route: ActivatedRoute, private router: Router, private jobsService: JobsService, private usersService: UsersService, private cookieService: CookieService) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('jobId');
      this.jobId = Number(id);
    });
  }

  jobId!: number;

  ngOnInit(): void {
    this.jobsService.getById(this.jobId).subscribe((res) => {
      console.log(res)
      this.jobCard = res;
    })
  }

  apply() {
    // this.usersService.put(this.user, this.jobId, 'student').subscribe((res) => {
    //   this.router.navigate(['./mylist'])
    // })
  }
}
