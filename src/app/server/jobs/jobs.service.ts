import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Jobs} from "./jobs";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private apiServer = "https://jobrapidflask-q35e2.ondigitalocean.app/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem('user_jwt')))}`
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  post(job: any): Observable<any> {
    const date = job.application_deadline.split('-');
    const day = date[2];
    const month =  date[1];
    const year =  date[0];


    const formData = new FormData();
    formData.append('job_title', job.job_title);
    formData.append('job_description', job.job_description);
    formData.append('location', job.location);
    formData.append('salary', job.salary);
    formData.append('application_deadline', `${day}-${month}-${year}`);
    formData.append('job_email', job.job_email);
    formData.append('job_phone', job.job_phone);
    formData.append('tags', job.tags);
    formData.append('image', job.image);
    return this.httpClient.post<any>(this.apiServer + `/jobs/post`, formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(job_id: any): Observable<any> {
    const params = new HttpParams().set('job_id', job_id);

    return this.httpClient.get<any>(this.apiServer + `/jobs/get`, {params})
      .pipe(
        catchError(this.errorHandler)
      )
  }

  get(params: HttpParams): Observable<any> {
    return this.httpClient.get<Jobs[]>(this.apiServer + `/jobs/page`, {params})
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getTags(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + `/jobs/tags/get`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  addTag(tag: string): Observable<any> {
    const formData = new FormData();
    formData.append('tag', tag);
    return this.httpClient.post<any>(this.apiServer + `/jobs/tags/post`, formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  put(job: any, job_id: any): Observable<any> {
    const date = job.application_deadline.split('-');
    const day = date[2];
    const month =  date[1];
    const year =  date[0];

    const formData = new FormData();
    formData.append('job_title', job.job_title);
    formData.append('job_description', job.job_description);
    formData.append('location', job.location);
    formData.append('salary', job.salary);
    formData.append('application_deadline', `${day}-${month}-${year}`);
    formData.append('job_email', job.job_email);
    formData.append('job_phone', job.job_phone);
    formData.append('tags', job.tags);
    formData.append('image', job.image);
    const params = new HttpParams().set('job_id', job_id);
    return this.httpClient.put<Jobs>(this.apiServer + `/jobs/put`, formData, { params, headers: this.httpOptions.headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(job_id: any): Observable<any> {
    const params = new HttpParams().set('job_id', job_id);
    return this.httpClient.delete<Jobs>(this.apiServer + `/users/deletejob`, { params, headers: this.httpOptions.headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}

