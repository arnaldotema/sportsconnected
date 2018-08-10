import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher
} from '../validators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchService} from '../_services/match.service';
import {MatchViewModel} from '../_models/match_viewmodel';
import {ScrollToService} from 'ng2-scroll-to-el';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnInit, AfterViewInit {

  ngModelMockVar;
  currentMatchIdx;
  availableStuff;
  matchesInEdit;
  eventsToggled;
  selectizeConfig;
  season;
  team;
  parentErrorStateMatcher;
  seasons;
  genders;
  positions;
  countries;
  feet;
  cities;
  validation_messages;
  account_validation_messages;
  id;

  player_matches: MatchViewModel[];
  viewModel: UserInfoViewModel;
  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;
  matching_passwords_group: FormGroup;

  constructor(private matchService: MatchService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private scrollService: ScrollToService,
              private userInfoService : UserInfoService) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    // Charge mock values
    this.season = {
      id: '',
      name: ''
    };
    this.team = {
      id: '',
      name: ''
    };
    this.availableStuff = [
      '2 Golos',
      '2 Assistências',
      '2 Cartões Vermelhos',
      '3 Cartões Amarelos',
    ];
    this.matchesInEdit = {};
    this.eventsToggled = {};
    this.selectizeConfig = {
      create: true,
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      maxItems: null
    };
    this.parentErrorStateMatcher = new ParentErrorStateMatcher();
    this.seasons = [
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
    this.genders = [
      'Masculino',
      'Feminino'
    ];
    this.positions = [
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
    this.countries = [
      'Portugal',
      'Cabo Verde',
      'Angola',
      'São Tomé e Príncipe',
      'Brazil',
      'Moçambique',
      'Guiné Bissau'
    ];
    this.feet = [
      'Esquerdo',
      'Direito',
      'Ambos'
    ];
    this.cities = [
      'Lisboa',
      'Setúbal',
      'Praia',
      'Seixal',
      'Porto',
      'Faro',
      'Coimbra'
    ];
    this.validation_messages = {
      'name': [
        {type: 'required', message: 'O nome é obrigatório'}
      ],
      'gender': [
        {type: 'required', message: 'Insere o teu género.'},
      ],
      'birthday': [
        {type: 'required', message: 'Por favor, insere a tua data de nascimento'},
      ]
    };
    this.account_validation_messages = {
      'username': [
        {type: 'required', message: 'Username is required'},
        {type: 'minlength', message: 'Username must be at least 5 characters long'},
        {type: 'maxlength', message: 'Username cannot be more than 25 characters long'},
        {type: 'pattern', message: 'Your username must contain only numbers and letters'},
        {type: 'validUsername', message: 'Your username has already been taken'}
      ],
      'email': [
        {type: 'required', message: 'Email is required'},
        {type: 'pattern', message: 'Enter a valid email'}
      ],
      'confirm_password': [
        {type: 'required', message: 'Confirm password is required'},
        {type: 'areEqual', message: 'Password mismatch'}
      ],
      'password': [
        {type: 'required', message: 'Password is required'},
        {type: 'minlength', message: 'Password must be at least 5 characters long'},
        {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number'}
      ],
      'terms': [
        {type: 'pattern', message: 'You must accept terms and conditions'}
      ]
    };
  }

  ngAfterViewInit() {
    this.userInfoService.getUserInfo(this.id)
      .subscribe(userInfo => {
        debugger;
        this.viewModel = userInfo;
        this.createForms();
      });
  }

  createForms() {
    // matching passwords validation

    // user details form validations
    this.userDetailsForm = this.fb.group({
      name: [this.viewModel.current_season.personal_info.name, Validators.required],
      birthday: [this.viewModel.current_season.personal_info.date_of_birth, Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
      height: [this.viewModel.current_season.personal_info.height, Validators.required],
      weight: [this.viewModel.current_season.personal_info.weight, Validators.required],
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
    });

  }

  onSubmitAccountDetails(value) {
    console.log(value);
  }

  onSubmitUserDetails(value) {
    console.log(value);
  }

  loadGames() {
    this.matchService.getPlayerMatchByTeamSeason(this.viewModel.user_id, this.team.id, this.season.id)
      .subscribe(player_matches => this.player_matches = player_matches);
  }

  save() {
    // Todo: Saves current information to the user model and returns to user-info
    this.router.navigate(['/user-info/' + this.id]);
  }

  discard() {
    // Todo: Discards current information and returns to user-info
    this.router.navigate(['/user-info/' + this.id]);
  }

  goToMatch() {
    // Todo: Discards current information and returns to user-info
    this.router.navigate(['/match']);
  }

  changedInput(inputType, event, isMatch) {
    let value = event.target.value;
    if (isMatch)
      this.player_matches[this.currentMatchIdx].home_team.main_lineup[0][inputType] = value;
    else
      this.viewModel[inputType] = value;
  }


  goToTop(index) {
    this.scrollService.scrollTo('#top', 500, -100);
    this.eventsToggled[index] = false;
  }

}
