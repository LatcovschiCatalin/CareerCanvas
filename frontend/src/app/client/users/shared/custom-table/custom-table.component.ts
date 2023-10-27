import {Component, Input, OnDestroy, OnInit, ViewEncapsulation,} from '@angular/core';
import {QueryParamsService} from "../../../services/query-params.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, Validators} from "@angular/forms";
import {Jobs} from "../../../../server/jobs/jobs";
import {phoneNumberRegex, validationMessages} from "../../../constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JobsService} from "../../../../server/jobs/jobs.service";
import {UsersService} from "../../../../server/users/users.service";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CustomTableComponent implements OnInit, OnDestroy {
  @Input() tableConfig: any;

  @Input() set columns(event: any) {
    this.sourceColumns = event;
    // @ts-ignore
    this.displayedColumns = [...this.sourceColumns?.map(el => el.key), 'actions'];
  };

  user: any;
  displayedColumns: any;
  sourceColumns: any;
  limit = [10, 20, 50, 100];
  limit_docs = 10;
  page = 1;
  add = false;
  data: any;
  changedData: any;
  pageData: any;
  show_sort = false;
  searchTerm = '';
  sort = '';
  order = 'ASC'
  observables: Subscription[] = [];
  width = window.innerWidth - 370;
  fieldWidth: any;
  id = '-1';
  // @ts-ignore
  obj: Jobs;
  validators = {
    required: {
      type: 'required',
      message: validationMessages.requiredField
    },
    email: {
      type: 'email',
      message: validationMessages.email
    },
    phone: {
      type: 'pattern',
      args: phoneNumberRegex,
      message: validationMessages.invalidPhone
    },
  }
  formData = [
    {
      title: 'Job Title',
      key: 'job_title',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Job Description',
      key: 'job_description',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Location',
      key: 'location',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Salary',
      key: 'salary',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Deadline',
      key: 'application_deadline',
      type: 'date',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Phone',
      key: 'phone',
      type: 'text',
      default: '',
      validators: [this.validators.required, this.validators.phone]
    },
    {
      title: 'Email',
      key: 'email',
      type: 'text',
      default: '',
      validators: [this.validators.required, this.validators.email]
    }
  ]

  customForm = this.formBuilder.group({
    job_title: ['', Validators.required],
    job_description: ['', [Validators.required]],
    location: ['', [Validators.required]],
    salary: ['', Validators.required],
    application_deadline: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(phoneNumberRegex)]],
  });

  mode = ''

  constructor(private snackBar: MatSnackBar, private router: Router, private jobsService: JobsService, private formBuilder: FormBuilder, private qpService: QueryParamsService, private route: ActivatedRoute, private cookieService: CookieService, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.userInfo().subscribe((user)=>{
      this.user = user;
    })
    this.mode = this.cookieService.get('mode') || 'dark';

    this.showSort(false);
    this.fieldWidth = (this.width - 126) / this.width * 100 / (this.displayedColumns.length - 1) / 100 * this.width;
    this.observables.push(this.route.queryParams.subscribe(res => {
      this.sort = res['sort'] || '';
      this.order = res['order'] || 'ASC';
      this.searchTerm = res['searchTerm'] || '';
      if (res['page']) {
        this.page = Number(res['page']);
      } else {
        this.qpService.updateParam('page', 1);
        this.page = 1;
      }

      if (res['limit']) {
        this.limit_docs = Number(res['limit']);
      } else {
        this.qpService.updateParam('limit', 10);
        this.limit_docs = 10;
      }
    }))
    this.getData();
  }

  showSort(show: boolean) {
    this.show_sort = show;
    if (!this.show_sort) {
      this.qpService.deleteParams({'sort': null, 'order': null});
    }
  }

  sortData(sort: any, order?: any) {
    if (this.show_sort) {
      let field = '';
      let ord = '';
      this.observables.push(this.route.queryParams.subscribe(res => {
        field = res['sort'] || '';
        ord = res['order'] === 'ASC' && field === sort ? 'DES' : 'ASC';
      }));
      ord = order ? order : ord;
      this.qpService.updateParams({sort: sort, order: ord});
      this.sort = sort;
      this.order = ord;
      this.changedData.sort((a: any, b: any) => (ord == 'DES' ? a[sort] < b[sort] : a[sort] > b[sort]) ? 1 : -1)
      this.refreshPage();
    }
  }

  search() {
    this.qpService.updateParams({searchTerm: this.searchTerm});
    this.changedData = this.data.filter((el: any) => {
      let keys = Object.keys(el).filter(key => (
        key !== 'image'
      ))
      let finalRow: any = {};
      for (let a = 0; a < keys.length; a++) {
        finalRow[keys[a]] = el[keys[a]]
      }
      return JSON.stringify(finalRow).toLowerCase().includes(this.searchTerm);
    })
    this.sortData(this.sort, this.order);
    this.refreshPage();
  }

  getData() {
    let elements: any[] = [];
    this.usersService.userJobs().subscribe((data: any) => {
      for (let i=0;i++; i<data.length){
        this.jobsService.getById((data[i].job_id)).subscribe((res: any)=>{
          elements.push(res)
          this.data = elements;
        })
      }
      this.qpService.updateParam('totalItems', elements.length);

      // this.search();
      // this.refreshPage();
    });
  }

  onDelete(id: any) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.tableConfig?.service.delete(id).subscribe(() => {
        this.getData();
      });
      this.snackBar.open('Users deleted successfully', '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: 'success'
      })
    }
  }

  onPaginateChange(e: any) {
    if (e.pageSize !== this.limit_docs) {
      this.limit_docs = e.pageSize;
      this.page = 1;
      this.qpService.updateParam('limit', this.limit_docs);
    } else if (e.pageIndex + 1 !== this.page) {
      this.page = Number(e.pageIndex) + 1;
      this.qpService.updateParam('page', this.page);
    }
    this.refreshPage();
  }

  refreshPage() {
    let total = this.changedData?.length;
    let finalData: object[] = [];
    let initial = (this.page - 1) * this.limit_docs;
    let next = initial + this.limit_docs;
    let last = next > total ? total : next;
    for (let i = initial; i < last; i++) {
      finalData.push(this.changedData[i])
    }
    this.pageData = finalData.filter((el: any) => {
      return el
    })
  }

  onAction(key: any, id?: any) {
    switch (key.toLowerCase()) {
      case 'delete': {
        this.onDelete(id);
        break;
      }
      case 'add': {
        this.qpService.deleteParam('id');
        this.id = '-1';
        if (this.add) {
          this.submit();
        } else {
          this.refreshForm();
        }
        this.add = true;
        break;
      }
      case 'edit': {
        this.add = false;
        this.id = id;
        this.refreshForm();
        this.qpService.updateParam('id', id);
        break;
      }
      case 'save': {
        this.submit();
        this.qpService.deleteParam('id');
        this.id = '-1';
        break;
      }
      case 'view': {
        this.router.navigate(['/details/' + id]);
        break;
      }
    }
  }

  submit() {
    if (this.customForm.invalid) {
      this.customForm.markAllAsTouched();
      return false;
    } else {
      const formValues = this.customForm.value;
      const jobData = {
        job_title: formValues.job_title,
        job_description: formValues.job_description,
        location: formValues.location,
        salary: formValues.salary,
        application_deadline: formValues.application_deadline,
        job_email: formValues.email,
        job_phone: formValues.phone,
      };

      if (this.id !== '-1') {
        this.jobsService.put(jobData, this.id).subscribe(() => {
          this.getData();
          this.refreshForm();
          this.id = '-1';
          this.snackBar.open('Job updated successfully', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'success'
          });
        });
      } else {
        // Create a new job posting
        this.jobsService.post(jobData).subscribe(() => {
          this.getData();
          this.refreshForm();
          this.add = false;
          this.snackBar.open('Job added successfully', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'success'
          });
        });
      }
      return true;
    }
  }

  refreshForm() {
    if (this.id !== '-1') {
      this.jobsService.getById(this.id).subscribe((res) => {
        const data = res;
        this.customForm.patchValue({
          job_title: data.title,
          job_description: data.description,
          location: data.location,
          salary: data.salary,
          application_deadline: data.application_deadline,
          email: data.job_email,
          phone: data.job_phone,
        });
      });
    } else {
      this.customForm.reset({
        job_title: '',
        job_description: '',
        location: '',
        salary: '',
        application_deadline: '',
        email: '',
        phone: '',
      });
    }
  }

  ngOnDestroy() {
    this.observables.forEach(obs => {
      obs.unsubscribe();
    })
  }

}
