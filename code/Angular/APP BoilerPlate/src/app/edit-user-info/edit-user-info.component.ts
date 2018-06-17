import { Component, OnInit } from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher
} from '../validators';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent  implements OnInit {

  viewModel: UserInfoViewModel;
  userInfoService: UserInfoService;

  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;


  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = [
    "Male",
    "Female",
    "Other"
  ];

  countries = [
    'Uruguay',
    'United States',
    'Argentina'
  ];


  validation_messages = {
    'fullname': [
      { type: 'required', message: 'Full name is required' }
    ],
    'bio': [
      { type: 'maxlength', message: 'Bio cannot be more than 256 characters long' },
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'birthday': [
      { type: 'required', message: 'Please insert your birthday' },
    ],
    'phone': [
      { type: 'required', message: 'Phone is required' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ]
  };

  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.userInfoService = new UserInfoService();
    this.userInfoService.getUserInfo('0')
      .subscribe(userInfo => this.viewModel = userInfo);
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // country & phone validation
    let country = new FormControl(this.countries[0], Validators.required);

    let phone = new FormControl('', {
      validators: Validators.compose([
        Validators.required
      ])
    });

    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    // user details form validations
    this.userDetailsForm = this.fb.group({
      fullname: ['Homero Simpson', Validators.required ],
      bio: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", Validators.maxLength(256)],
      birthday: ['', Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
      country_phone: this.country_phone_group
    });


    // user links form validations
    this.accountDetailsForm = this.fb.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(false, Validators.pattern('true'))
    })

  }

  onSubmitAccountDetails(value){
    console.log(value);
  }

  onSubmitUserDetails(value){
    console.log(value);
  }

  hasClass(elementId, className) {
    let elem = document.getElementById(elementId);
    return (' ' + elem.className + ' ').indexOf(' ' + className + ' ') > -1;
  }

  over(event, isOver) {
    let elem = event.target;
    let newClassName = ' ' + 'over' + ' ';
    isOver ? elem.className += newClassName : elem.classList.remove('over');
  }

  changeTab(tabId) {
    let newClassName = ' ' + 'current' + ' ';
    if (document.getElementsByClassName('current')[0]) {
      document.getElementsByClassName('current')[0].classList.remove('current');
      document.getElementById(tabId).className += newClassName;
    }
  }
}
