import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from '../../auth/auth.service';
import * as base64js from 'base64-js';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;
  userId = localStorage.getItem('user_id');

  constructor(private sanitizer: DomSanitizer, private usersService: UsersService, private authService: AuthService, private cookieService: CookieService) {
    this.userId = this.authService.parseJwt(this.authService.getToken() || '').sub.id;
  }

  ngOnInit(): void {
    this.usersService.userInfoId(this.userId).subscribe((user) => {
      this.user = user;
    })
  }

  logout() {
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
