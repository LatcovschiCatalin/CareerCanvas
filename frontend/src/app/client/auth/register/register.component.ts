import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {phoneNumberRegex, validationMessages} from "../../constants";
import {AuthService} from "../auth.service";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

  customForm: FormGroup;
  tabs = ['Student', 'Recruiter'];
  tab = this.tabs[0].toLowerCase();
  validators = {
    required: {
      type: 'required',
      message: validationMessages.requiredField
    },
    email: {
      type: 'email',
      message: validationMessages.email
    },
    phone: {
      type: 'pattern',
      args: phoneNumberRegex,
      message: validationMessages.invalidPhone
    },
  }

  formData = [
    {
      title: 'Name',
      key: 'first_name',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Surname',
      key: 'last_name',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Phone',
      key: 'phone',
      type: 'text',
      default: '',
      validators: [this.validators.required, this.validators.phone]
    },
    {
      title: 'Email',
      key: 'email',
      type: 'text',
      default: '',
      validators: [this.validators.required, this.validators.email]
    },
    {
      title: 'Date of birth',
      key: 'date_of_birth',
      type: 'date',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Address',
      key: 'address',
      type: 'text',
      default: '',
      validators: [this.validators.required]
    },
    {
      title: 'Gender',
      key: 'gender',
      type: 'select',
      default: 'M',
      validators: [this.validators.required]
    },
    {
      title: 'Skills',
      key: 'skills',
      type: 'text',
      default: '',
      validators: []
    },
    {
      title: 'Password',
      key: 'password',
      type: 'password',
      default: '',
      validators: [this.validators.required]
    },
  ]

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.customForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(phoneNumberRegex)]],
      date_of_birth: [null, [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tab = tabChangeEvent.tab.textLabel.toLowerCase();
  }

  register() {
    const user = { ...this.customForm.value, ...{role: this.tab.charAt(0).toUpperCase() + this.tab.slice(1)} };
    if (this.customForm.invalid) {
      this.customForm.markAllAsTouched();
      return false;
    } else {
      this.authService.register(user);
    }
    return user;
  }

}
