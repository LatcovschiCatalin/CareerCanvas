import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Users} from "./users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServer = "http://127.0.0.1:5000/api";

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem('user_jwt')))}`
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  // register(user: any): Observable<any> {
  //   console.log(this.apiServer + `/users/registration/`)
  //   return this.httpClient.post<Users>(this.apiServer + `/users/registration/`, user)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }

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


  userJobs(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + '/users/getjobs', this.httpOptions)
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

