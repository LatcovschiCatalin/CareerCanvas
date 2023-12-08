import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {JobsService} from "../../../../server/jobs/jobs.service";

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

  constructor(private router: Router, private service: JobsService) {
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

}
