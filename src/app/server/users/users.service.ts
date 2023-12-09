import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Users} from "./users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServer = "https://jobrapidflask-q35e2.ondigitalocean.app/api";

   httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem('user_jwt')))}`
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  register(user: any): Observable<any> {
    const formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('date_of_birth', user.date_of_birth);
    formData.append('gender', user.gender);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    formData.append('role', user.role);
    formData.append('skills', user.skills);

    return this.httpClient.post<Users>(this.apiServer + '/users/registration', formData)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  changeStatus(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('student_id', data.student_id);
    formData.append('job_id', data.job_id);
    formData.append('status', data.status);

    return this.httpClient.put(this.apiServer + '/users/changestatus', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  login(credentials: any): Observable<any> {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    return this.httpClient.post<Users>(this.apiServer + '/users/login', formData)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  verify(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + '/users/verify', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  userInfo(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + '/users/getinfo', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateProfile(user: any): Observable<any> {
    const formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    if (user.password) formData.append('password', user.password);
    formData.append('date_of_birth', user.date_of_birth);
    formData.append('gender', user.gender);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    formData.append('skills', user.skills);
    formData.append('avatar', user.avatar);

    return this.httpClient.put(this.apiServer + '/users/update', formData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  userJobs(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + '/users/getrecruiterjobs', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  studentJobs(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + '/users/getstudentjobs', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  jobApply(job_id: any): Observable<any> {
    const form = new FormData();
    form.append('job_id', String(job_id));

    return this.httpClient.post((this.apiServer + `/users/apply`), form, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteApply(job_id: any): Observable<any> {
    const params = new HttpParams().set('job_id', job_id);
    return this.httpClient.delete(this.apiServer + `/users/deleteapply`, { params, headers: this.httpOptions.headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAppliedStudents(job_id: any): Observable<any> {
    const params = new HttpParams().set('job_id', job_id);

    return this.httpClient.get<any>(this.apiServer + '/users/getstudents', { params, headers: this.httpOptions.headers})
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getById(id: any, tab: String): Observable<Users> {
    return this.httpClient.get<Users>(this.apiServer + `/${tab}/` + id)
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

