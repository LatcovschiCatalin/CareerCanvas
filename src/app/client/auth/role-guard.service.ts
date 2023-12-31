import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private _snackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    const expectedRoles = route.data['roles'];
    if (expectedRoles) {
      const token = this.auth.getToken();

      if (token) {
        const parsedToken = this.auth.parseJwt(token).sub;
        let roles: string[] = ['student', 'recruiter'];

        if (parsedToken.role && typeof parsedToken.role === 'string') {
          roles = [parsedToken.role.toLowerCase()]
        } else if (parsedToken.role?.length) {
          roles = parsedToken.role.toLowerCase();
        }

        if (!roles.length) {
          this.router.navigate(['auth/login']);

          return of(false);
        } else {
          let allRolesEligible = true;

          expectedRoles.forEach((role: string) => {
            if (!roles.find(el => el === role)) {
              allRolesEligible = false;
            }
          })

          if (!allRolesEligible) {
            this.router.navigate(['auth/login']);
          }

          return of(allRolesEligible)
        }
      } else {
        this.router.navigate(['auth/login']);
        return of(false);
      }
    } else {
      this.router.navigate(['auth/login']);

      return of(false);
    }
  }
}
