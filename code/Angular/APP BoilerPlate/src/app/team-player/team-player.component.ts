import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {TeamPlayer} from "../_models/team_player";

@Component({
  selector: 'app-team-player',
  templateUrl: './team-player.component.html',
  styleUrls: ['./team-player.component.css']
})
export class TeamPlayerComponent implements OnInit, AfterViewInit {

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
  team_id;
  id;
  newPlayer: TeamPlayer;

  viewModel: TeamPlayer;
  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;
  matching_passwords_group: FormGroup;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private scrollService: ScrollToService,
              private cdRef: ChangeDetectorRef,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {

    this.team_id = this.route.snapshot.paramMap.get('team_id');
    this.id = this.route.snapshot.paramMap.get('id');

    debugger;
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
      valueField: 'team_id',
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
    if (this.team_id) {
      if (this.id) {
        this.userInfoService.getTeamPlayer(this.team_id, this.id)
          .subscribe(userInfo => {

            this.viewModel = userInfo;

            this.createForms();

            // Updates after detecting changes
            this.cdRef.detectChanges();
          });
      }
      else {

        // Charge newPlayer
        this.viewModel = {
          _id: '',
          created_at: '',
          updated_at: '',
          user_info_id: '',
          name: '',
          date_of_birth: '',
          avatar: '/assets/default-profile.png',
          positions: [''],
          height: undefined,
          weight: undefined,
          foot: '',
          nationality: '',
          residence: '',
          contacts: [''],
          media: undefined,
          evaluations: {
            simple: undefined,
            advanced: undefined
          }
        };

        this.createForms();

        // Updates after detecting changes
        this.cdRef.detectChanges();
      }
    }
  }

  createForms() {
    // user details form validations
    this.userDetailsForm = this.fb.group({
      name: [this.viewModel.name, Validators.required],
      birthday: [this.viewModel.date_of_birth],
      contacts: [this.viewModel.contacts[0]],
      gender: new FormControl(this.genders[0]),
      height: [this.viewModel.height],
      weight: [this.viewModel.weight],
      country: new FormControl(this.countries[0]),
      city: new FormControl(this.cities[0]),
      position: new FormControl(this.positions[0]),
      foot: new FormControl(this.feet[0]),
    });

  }

  onSubmitAccountDetails(value) {
    console.log(value);
  }

  onSubmitUserDetails(value) {
    console.log(value);
  }

  save() {
    // Todo: Saves current information to the user model and returns to user-info
    this.router.navigate(['/team/' + this.team_id]);
  }

  discard() {
    // Todo: Discards current information and returns to user-info
    this.router.navigate(['/user-info/' + this.team_id]);
  }

  changedInput(inputType, event) {
    this.viewModel[inputType] = event.target.value;
  }

  goToTop(index) {
    this.scrollService.scrollTo('#top', 500, -100);
    this.eventsToggled[index] = false;
  }
}
