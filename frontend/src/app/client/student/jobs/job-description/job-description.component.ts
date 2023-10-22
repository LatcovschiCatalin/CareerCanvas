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

  jobs: any[] = [];

  user = {
    jobs: [],
    id: 0
  }

  recruiters = [{
    jobs: [],
    id: 0,
    email: ''
  }]

  jobId!: number;

  ngOnInit(): void {

    this.jobsService.get().subscribe((res) => {
      this.jobs = res;
    })

    this.jobsService.getById(this.jobId).subscribe((res) => {
      this.jobCard = res;
    })

    this.usersService.get(this.cookieService.get('role')).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].email == this.cookieService.get('user')) {
          // @ts-ignore
          this.user = res[i];
        }
      }
    })
    this.usersService.get('recruiter').subscribe((res) => {
      // @ts-ignore
      this.recruiters = res;
    })
  }

  apply(id: number) {
    for (let i = 0; i < this.jobs.length; i++) {
      // @ts-ignore
      if (this.jobs[i]['id'] === id) {
        // @ts-ignore
        let jobs: Jobs[] = this.user.jobs;
        // @ts-ignore
        const isDuplicate = this.user.jobs.some(job => job.id === this.jobs[i]['id']);

        if (!isDuplicate) {
          this.jobs[i].status = 'waiting';
          jobs.push(this.jobs[i]);
        }
        for (let j = 0; j < this.recruiters.length; j++) {
          if (this.recruiters[j].email == this.jobs[i].recruiter) {
            // @ts-ignore
            const user: User = this.user as User;
            const jobId = this.jobs[i]['id'];

            // @ts-ignore
            const isDuplicate = this.recruiters[j].jobs.some(job => job.jobId === jobId && job.email === user.email);

            if (!isDuplicate) {
              this.recruiters[j].jobs = [
                {
                  // @ts-ignore
                  name: user.name + ' ' + user.surname,
                  // @ts-ignore
                  email: user.email,
                  // @ts-ignore
                  phone: user.phone,
                  // @ts-ignore
                  status: 'waiting',
                  // @ts-ignore
                  jobId,
                },
                ...this.recruiters[j].jobs,
              ];
            }

            let id2 = this.recruiters[j].id
            // @ts-ignore
            this.usersService.put(this.recruiters[j], id2, 'recruiter').subscribe((res) => {
            })
            break;
          }
        }
        // @ts-ignore
        this.user.jobs = jobs
        let id = this.user.id
        // @ts-ignore
        this.usersService.put(this.user, id, 'student').subscribe((res) => {
          this.router.navigate(['./mylist'])
        })
        break;
      }
    }
  }
}
