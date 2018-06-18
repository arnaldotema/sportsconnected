import { Component, OnInit } from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher
} from '../validators';
import {Router} from '@angular/router';

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

  season;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  seasons = [
    {
      id: '2',
      name: '2017/18'
    },
    {
      id: '3',
      name: '2016/17'
    },
    {
      id: '2',
      name: '2015/16'
    },
    {
      id: '2',
      name: '2014/15'
    },
    {
      id: '2',
      name: '2013/14'
    },
    {
      id: '2',
      name: '2012/13'
    },
    {
      id: '2',
      name: '2011/12'
    },
  ];

  genders = [
    "Masculino",
    "Feminino"
  ];

  positions = [
    'Guarda-redes',
    'Defesa Central',
    'Defesa Esquerdo',
    'Defesa Direito',
    'Defesa',
    'Médio Defensivo',
    'Médio Ofensivo',
    'Médio Esquerdo',
    'Médio Direito',
    'Médio Centro',
    'Ala Esquerdo',
    'Ala Direito',
    'Avançado',
  ];

  countries = [
    'Portugal',
    'Cabo Verde',
    'Angola',
    'São Tomé e Príncipe',
    'Brazil',
    'Moçambique',
    'Guiné Bissau'
  ];

  feet = [
    'Esquerdo',
    'Direito',
    'Ambos'
  ];

  cities = [
    'Lisboa',
    'Setúbal',
    'Praia',
    'Seixal',
    'Porto',
    'Faro',
    'Coimbra'
  ];

  validation_messages = {
    'fullname': [
      { type: 'required', message: 'O nome é obrigatório' }
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'birthday': [
      { type: 'required', message: 'Por favor, insere a tua data de nascimento' },
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

  constructor(private fb: FormBuilder, private router: Router ) {
  }

  ngOnInit() {
    this.userInfoService = new UserInfoService();
    this.userInfoService.getUserInfo('0')
      .subscribe(userInfo => this.viewModel = userInfo);
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    /*
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
    */

    // user details form validations
    this.userDetailsForm = this.fb.group({
      fullName: [this.viewModel.personal_info.full_name, Validators.required ],
      birthday: [this.viewModel.personal_info.date_of_birth, Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
      height: [this.viewModel.personal_info.height, Validators.required ],
      weight: [this.viewModel.personal_info.weight, Validators.required ],
      country: new FormControl(this.countries[0], Validators.required),
      city: new FormControl(this.cities[0], Validators.required),
      position: new FormControl(this.positions[0], Validators.required),
      foot: new FormControl(this.feet[0], Validators.required),
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

  loadGames(){

  }

  save(){
    // Todo: Saves current information to the user model and returns to user-info
    this.router.navigate(['/user-info']);
  }

  discard(){
    // Todo: Discards current information and returns to user-info
    this.router.navigate(['/user-info']);
  }
}
