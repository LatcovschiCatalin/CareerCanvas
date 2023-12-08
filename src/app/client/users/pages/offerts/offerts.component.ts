import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../../../../server/users/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-offerts',
  templateUrl: './offerts.component.html',
  styleUrls: ['./offerts.component.scss']
})
export class OffertsComponent implements OnInit {

  id: any;
  users: any;

  constructor(private router: Router, private service: UsersService,     private snackBar: MatSnackBar) {
    let routes = this.router.url.split('/');
    this.id = routes[routes.length - 1];
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getAppliedStudents(this.id).subscribe((res: any) => {
      this.users = res;
    });
  }

  back() {
    this.router.navigate(['./recruiter']);
  }

  changeStatus(status: any, userId: any) {
    this.service.changeStatus({status: status, student_id: userId, job_id: this.id}).subscribe((res: any) => {
      if (res.message) {
        this.snackBar.open(res.message, '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'success'
        })
        this.getData();
      } else {
        this.snackBar.open(res.error, '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'error'
        })
      }
    })
  }

  calculateAge(dateOfBirthString: string): number | null {
    const birthdate = new Date(dateOfBirthString);

    if (isNaN(birthdate.getTime())) {
      console.error('Invalid date of birth');
      return null;
    }

    const currentDate = new Date();
    const birthYear = birthdate.getFullYear();
    const currentYear = currentDate.getFullYear();

    let age = currentYear - birthYear;

    const birthdateThisYear = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());

    if (currentDate < birthdateThisYear) {
      age--;
    }

    return age;
  }
}
