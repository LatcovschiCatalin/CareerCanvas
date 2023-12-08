import {Component, OnInit} from '@angular/core';
import {QueryParamsService} from "../../../services/query-params.service";
import {JobsService} from "../../../../server/jobs/jobs.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  columns = [
    {
      key: 'job_title',
      name: 'Title',
      type: 'text',
    },
    {
      key: 'job_description',
      type: 'text',
      name: 'Description',
    },
    {
      key: 'location',
      type: 'text',
      name: 'Location',
    },
    {
      key: 'salary',
      type: 'number',
      name: 'Salary',
    },
    {
      key: 'application_deadline',
      type: 'date',
      name: 'Deadline',
    },
    {
      key: 'job_email',
      type: 'text',
      name: 'Email',
    },
    {
      key: 'job_phone',
      type: 'text',
      name: 'Phone',
    },
  ];
  actions: object[] = []

  constructor(
    public qpService: QueryParamsService,
    public service: JobsService
  ) {
    this.actions = [
      {
        key: 'edit',
        icon: '/assets/icons/dark/edit.png'
      },
      {
        key: 'view',
        icon: '/assets/icons/dark/view.svg'
      },
      {
        key: 'delete',
        icon: '/assets/icons/dark/trash.png'
      },
      {
        key: 'offers',
        icon: '/assets/icons/dark/notification.svg'
      },
    ]
  }

  ngOnInit() {
    this.qpService.deleteParam('id');
  }

}
