import {Component, OnInit} from '@angular/core';
import {JobsService} from "../../../../server/jobs/jobs.service";
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {


  constructor(private jobsService: JobsService, private usersService: UsersService, private cookieService: CookieService) {
  }

  filterTags: string[] = [];
  closeFilterTag(tag: string): void {
    const index = this.filterTags.indexOf(tag);
    if (index !== -1) {
      this.filterTags.splice(index, 1);
    }

    this.filteredData = this.jobs.filter((job) => {
      return this.filterTags.every((filterTag) => job.tags.includes(filterTag));
    });
  }

  clearFilterTags(): void {
    this.filterTags = [];
    this.filteredData = this.jobs;
  }

  addFilterTag(tag: string, event: Event): void {
    event.stopPropagation();
    if (this.filterTags.indexOf(tag) === -1) {
      this.filterTags.push(tag);
    }

    this.filteredData = this.jobs.filter((job) => {
      return this.filterTags.every((filterTag) => job.tags.includes(filterTag));
    });
  }


  jobs: any[] = [];

  filteredData = this.jobs;
  searchValue = '';

  user = {
    jobs: [],
    id: 0
  }

  recruiters = [{
    jobs: [],
    id: 0,
    email: ''
  }]

  ngOnInit(): void {
    this.jobsService.get().subscribe((res) => {
      console.log(res)
      this.jobs = res.data;
      this.filteredData = this.jobs
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

  search() {
    this.filteredData = this.jobs.filter(item => {
      return Object.values(item).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(this.searchValue.toLowerCase());
        }
        return false;
      });
    });
  }
}
