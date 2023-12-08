import {Component, OnInit} from '@angular/core';
import {Jobs} from "../../../../server/jobs/jobs";
import {JobsService} from "../../../../server/jobs/jobs.service";
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";
import * as base64js from 'base64-js';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-selected-jobs',
  templateUrl: './selected-jobs.component.html',
  styleUrls: ['./selected-jobs.component.scss']
})
export class SelectedJobsComponent implements OnInit {

  jobs: any[] = []

  constructor(private sanitizer: DomSanitizer, private usersService: UsersService, private cookieService: CookieService) {
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

  getImageUrl(base64: any): SafeUrl {
    const byteArray = base64js.toByteArray(base64);
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust the MIME type as per your image type
    const imageUrl = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}
