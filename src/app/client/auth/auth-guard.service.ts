import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {UsersService} from '../../server/users/users.service';
import {tap, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private crudService: UsersService) {
  }

  canActivate(): Observable<boolean> {
    if (!localStorage.getItem('user_jwt')){
      return this.crudService.verify().pipe(
        map((user: any) => {
          if (!user) {
            this.router.navigate(['auth/login']);
            return false; // User is not authenticated
          }

          if (user.role.toLowerCase() === 'recruiter'){
            this.router.navigate(['recruiter']);
          } else {
            this.router.navigate(['/']);
          }
          return true; // User is authenticated
        })
      );
    }
    return of(true);
  }
  }
