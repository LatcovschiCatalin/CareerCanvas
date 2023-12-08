import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {JobsService} from "../../../../server/jobs/jobs.service";
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";
import {HttpParams} from '@angular/common/http';
import * as base64js from 'base64-js';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {


  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef, private jobsService: JobsService, private usersService: UsersService, private cookieService: CookieService) {
  }

  filterTags: any[] = [];
  jobs: any[] = [];

  filteredData = this.jobs;
  searchValue = '';
  currentPage = 1;
  total = 0;
  limit = 10;

  closeFilterTag(tag: string): void {
    const index = this.filterTags.indexOf(tag);
    if (index !== -1) {
      this.filterTags.splice(index, 1);
      this.filterData();
    }
  }

  clearFilterTags(): void {
    this.filterTags = [];
    this.filterData();
  }

  addFilterTag(tag: any, event: Event): void {
    event.stopPropagation();

    if (this.filterTags.indexOf(tag) === -1) {
      this.filterTags.push(tag);
      this.filterData();
    }
  }

  ngOnInit(): void {
    this.getJobs();
  }

  filterData() {
    this.filteredData = this.jobs;
    if (this.filterTags.length > 0) {
      const tagNames = this.filterTags.map((tag) => tag.tag_name);
      this.filteredData = this.filteredData.filter((job) =>
        tagNames.every((tagName) =>
          job.tags.some((jobTag: any) => jobTag.tag_name === tagName)
        )
      );
    }

    if (this.searchValue) {
      this.filteredData = this.filteredData.filter(item => {
        return Object.values(item).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(this.searchValue.toLowerCase());
          }
          return false;
        });
      });
    }
    this.total = this.filteredData.length;
    this.filteredData = this.getDataForPage(this.filteredData);
  }

  changePage(e: any) {
    this.currentPage = e.pageIndex + 1;
    this.filteredData = this.getDataForPage();
  }

  getDataForPage(data?: any[]): any[] {
    const itemsPerPage = this.limit;
    const startIndex = (this.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (data && data.length > 0) return data;
    return this.jobs.slice(startIndex, endIndex);
  }

  getJobs() {
    this.jobsService.get(new HttpParams()
      .set('criteria', 'created')
      .set('order', 'ASC')
    ).subscribe((res) => {
      this.total = res.data.length;
      this.jobs = res.data;
      this.filteredData = this.getDataForPage();
    })
  }

  isNewJob(createdTimestamp: number): boolean {
    const twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

    return new Date(createdTimestamp) > twoHoursAgo;
  }

  getImageUrl(base64: any): SafeUrl {
    const byteArray = base64js.toByteArray(base64);
    const blob = new Blob([byteArray], {type: 'image/jpeg'}); // Adjust the MIME type as per your image type
    const imageUrl = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
