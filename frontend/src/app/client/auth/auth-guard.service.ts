import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {UsersService} from '../../server/users/users.service';
import {tap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private crudService: UsersService) {
  }

  canActivate(): Observable<boolean> {
    return this.crudService.verify().pipe(
      map((user: any) => {
        console.log(user)
    if (localStorage.getItem('user_jwt')) {
      this.router.navigate(['auth/login']);
      return false; // User is not authenticated
    }
    return true; // User is authenticated
    })
    );
    }
  }
