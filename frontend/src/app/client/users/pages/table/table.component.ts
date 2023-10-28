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
      name: 'location',
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
      name: 'Phon',
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
        name: 'Edit'
      },
      {
        key: 'view',
        name: 'View'
      },
      {
        key: 'delete',
        name: 'Delete'
      },

    ]
  }

  ngOnInit() {
    this.qpService.deleteParam('id');
  }

}
