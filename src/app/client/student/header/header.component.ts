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

  constructor(private sanitizer: DomSanitizer, private usersService: UsersService, private authService: AuthService, private cookieService: CookieService) {
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

  getImageUrl(base64: any): SafeUrl {
    const byteArray = base64js.toByteArray(base64);
    const blob = new Blob([byteArray], {type: 'image/jpeg'}); // Adjust the MIME type as per your image type
    const imageUrl = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
