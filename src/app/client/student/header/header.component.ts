import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;

  constructor(private usersService: UsersService, private authService: AuthService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.usersService.userInfo().subscribe((res) => {
      this.user = res;
    })
  }

  logout() {
    if (window.confirm('Are you sure you want to log out?')) {
      return this.authService.logout();
    }
  }

}
