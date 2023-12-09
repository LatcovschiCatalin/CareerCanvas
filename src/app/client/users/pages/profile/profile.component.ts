import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../server/users/users.service";
import * as base64js from 'base64-js';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {FormControl} from "@angular/forms";
import {AuthService} from '../../../auth/auth.service';

enum Gender {
  Male = 'M',
  Female = 'F',
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data = [
    {
      icon: 'assets/icons/light/user.png',
      label: 'Name',
      key: 'first_name',
      edit: false,
      value: '',
      type: 'text'
    },
    {
      icon: 'assets/icons/light/user.png',
      label: 'Surname',
      key: 'last_name',
      edit: false,
      value: '',
      type: 'text'
    },
    {
      icon: 'assets/icons/light/gender.png',
      label: 'Gender',
      key: 'gender',
      edit: false,
      value: '',
      type: 'select'
    },
    {
      icon: 'assets/icons/light/calendar.png',
      label: 'Birth',
      key: 'date_of_birth',
      edit: false,
      value: '',
      type: 'date'
    },
    {
      icon: 'assets/icons/light/solution.png',
      label: 'Skills',
      key: 'skills',
      edit: false,
      value: '',
      type: 'text'
    },
    {
      icon: 'assets/icons/light/email.png',
      label: 'Email',
      key: 'email',
      edit: false,
      value: '',
      type: 'text'
    },
    {
      icon: 'assets/icons/light/key.png',
      label: 'Password',
      key: 'password',
      edit: false,
      value: '',
      type: 'password'
    },
    {
      icon: 'assets/icons/light/call.png',
      label: 'Telephone',
      key: 'phone',
      edit: false,
      value: '',
      type: 'text'
    },
    {
      icon: 'assets/icons/light/location.png',
      label: 'Address',
      key: 'address',
      edit: false,
      value: '',
      type: 'text'
    }
  ]
  secret = '•••••••••••';
  user: any;
  saveUser: any;
  avatar!: any;
  genders: Gender[] = [Gender.Male, Gender.Female];
  userId;


  constructor(private sanitizer: DomSanitizer, private users: UsersService, private authService: AuthService) {
    this.userId = this.authService.parseJwt(this.authService.getToken() || '').sub.id;
    console.log(this.userId)
  }

  ngOnInit(): void {
    this.users.userInfoId(this.userId).subscribe((res) => {
      this.user = {
        ...res,
        password: '',
        date_of_birth: this.formatDate(res.date_of_birth)
      };
      this.avatar = this.user.avatar;
    })
  }

  getImageUrl(base64: any): SafeUrl {
    const byteArray = base64js.toByteArray(base64);
    const blob = new Blob([byteArray], {type: 'image/jpeg'});
    const imageUrl = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onFileSelected(e: any) {
    const file: File = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        try {
          // Check if the base64 string is valid
          const base64String = event.target.result.split(',')[1];
          atob(base64String);

          // Assign the valid base64 string to the 'avatar' property
          this.avatar = event.target.result
        } catch (error) {
          console.error('Invalid base64 string:', error);
          // Handle the error or provide feedback to the user
        }
      };

      // Read the file as a data URL, triggering the onload event
      reader.readAsDataURL(file);
    }
    this.user = {
      ...this.user,
      avatar: file
    }
  }

  startEdit(i: any) {
    this.data[i].edit = true;
  }

  saveEdit(i: any, key: any) {
    this.data[i].edit = false;
    if (this.data[i].value) this.user[key] = this.data[i].value;
  }

  updateValue(i: any, e: any) {
    this.data[i].value = e.target.value;
  }


  submit() {
    const data = this.user;
    if (!data.password) delete data.password;

    this.users.updateProfile(data).subscribe((res) => {
      console.log(res)
    })
  }

  changeGender(gender: any) {
    this.user.gender = gender;
  }
}
