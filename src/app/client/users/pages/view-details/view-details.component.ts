import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {JobsService} from "../../../../server/jobs/jobs.service";
import * as base64js from 'base64-js';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  id: any;
  data: any;
  tab = 'recruiter';
  keys!: string[];
  values!: string[];

  constructor(private sanitizer: DomSanitizer, private router: Router, private service: JobsService) {
    let routes = this.router.url.split('/');
    this.id = routes[routes.length - 1];
  }

  ngOnInit(): void {
    this.service.getById(this.id).subscribe((res) => {
      this.data = {
        ...res,
        tags: res.tags ? res.tags.map((tag: any) => tag.tag_name) : []
      };

      this.keys = Object.keys(this.data);
      this.values = this.keys.map((key) => key.replace('_', ' '));
    });
  }


back()
{
  this.router.navigate(['./recruiter']);
}

  getImageUrl(base64: any): SafeUrl {
    const byteArray = base64js.toByteArray(base64);
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust the MIME type as per your image type
    const imageUrl = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
