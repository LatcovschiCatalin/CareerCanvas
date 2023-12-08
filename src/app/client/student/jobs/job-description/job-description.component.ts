import {Component, OnInit} from '@angular/core';
import {Jobs} from "../../../../server/jobs/jobs";
import {JobsService} from "../../../../server/jobs/jobs.service";
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private jobsService: JobsService, private usersService: UsersService, private cookieService: CookieService) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('jobId');
      this.jobId = Number(id);
    });
  }

  jobId!: number;

  ngOnInit(): void {
    this.jobsService.getById(this.jobId).subscribe((res) => {
      this.jobCard = res;
    })
  }

  apply() {
    this.usersService.jobApply(String(this.jobId)).subscribe((res)=>{
      if (res.message) {
        this.router.navigate(['./mylist']);
        this._snackBar.open(res.message, '200', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'success'
        })
      } else {
        this.router.navigate(['']);
        this._snackBar.open(res.error, '400', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'error'
        })
      }
    });
  }

  isNewJob(createdTimestamp: number): boolean {
    const twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

    return new Date(createdTimestamp) > twoHoursAgo;
  }
}
