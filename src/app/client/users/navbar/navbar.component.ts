import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {UsersService} from "../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";
import * as base64js from 'base64-js';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  selected = 'dark'
  data = {
    title: "Users list"
  }

  user: any;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService, private usersService: UsersService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.usersService.userInfo().subscribe((res) => {
      this.user = res;
    })
  }


  logOut() {
    if (window.confirm('Are you sure you want to log out?')) {
      return this.authService.logout();
    }
  }

  getImageUrl(base64: any): SafeUrl {
    const byteArray = base64js.toByteArray(base64);
    const blob = new Blob([byteArray], {type: 'image/jpeg'}); // Adjust the MIME type as per your image type
    const imageUrl = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
