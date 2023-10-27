import {Component, OnInit} from '@angular/core';
import {JobsService} from "../../../../server/jobs/jobs.service";
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";
import {HttpParams} from '@angular/common/http';

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
  currentPage = 1;
  totalPages = 1;
  limit = 10;

  ngOnInit(): void {
    this.getJobs();
  }

  changePage(e: any){
    this.currentPage = e.pageIndex + 1;
    this.getJobs();
  }

  getJobs() {
    this.jobsService.get(new HttpParams()
      .set('criteria', 'created')
      .set('order', 'ASC')
      .set('page_num', String(this.currentPage))).subscribe((res) => {
      this.totalPages = res.total_pages;
      this.jobs = res.data;
      this.filteredData = this.jobs;
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
