import {Component, OnInit} from '@angular/core';
import {GenericUserService} from '../_services/generic_user.service';
import {Search_entity_viewmodel} from '../_models/search_entity_viewmodel';
import {Router} from '@angular/router';
import {UserInfoService} from '../_services/user_info.service';
import {TeamService} from '../_services/team.service';
import {UserInfoSearch} from '../_models/user_info_search';
import {Sort} from '@angular/material';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-filter-user-info',
  templateUrl: './filter-user-info.component.html',
  styleUrls: ['./filter-user-info.component.css']
})
export class FilterUserInfoComponent implements OnInit {

  teamService: TeamService;

  personal_data_select = [];
  stats_select = [];
  physical_atts_select;
  technical_atts_select;
  //mental_atts_select;
  sc_atts_select;
  competition_select;
  number_filter_select; //Todo : We need one of this for each filter
  mock_value_select;


  personal_data;
  physical_atts;
  technical_atts;
  number_filter_types;
  mock_value_types;
  mental_atts;
  sc_atts;
  competitions;
  seasons;
  stats;

  genericUserService: GenericUserService;
  userInfoService: UserInfoService;
  teams: Search_entity_viewmodel[];
  age_groups;
  leagues;
  players: UserInfoSearch[];
  user;

  sortedData;
  sliderRange;

  private search_fields: Array<any> = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.teamService = new TeamService();
    this.genericUserService = new GenericUserService();
    this.userInfoService = new UserInfoService();
    this.personal_data = ['Nome', 'D. de Nascimento', 'Idade', 'Residência', 'Clube', 'Mobilidade', 'Posição'];
    this.stats = ['Jogos', 'Minutos', 'Golos', 'Assistências', 'Classificação média', 'C. Amarelos', 'C. Vermelhos'];
    this.physical_atts = ['Altura', 'Peso', 'Votação SC', 'Velocidade', 'Resistência', 'Força', 'Agilidade', 'Reflexos', 'Impulsão', 'Proteção de bola', 'Corpo a corpo'];
    this.technical_atts = ['Passe', 'Recepção', 'Drible', 'Remates Longe', 'Finalização', 'Cabeceamento', 'Cruzamento', 'Desarme', 'Primeiro toque', 'Lançamentos Laterais', 'Cantos', 'Livres diretos', 'Livres indiretos', 'Penalties'];
    this.mental_atts = ['Agressividade', 'Bravura', 'Antecipação', 'Concentração', 'Determinação', 'Compostura', 'Tomada de decisão', 'Criatividade', 'Jogo sem bola', 'Posicionamento', 'Velocidade Reação', 'Visão de Jogo', 'Disciplina', 'Ética de trabalho', 'Espírito de grupo', 'Liderança', 'Comunicação'];
    this.sc_atts = ['Total de Badges', 'Total de Badges Época', 'Total de Badges Carreira'];
    this.competitions = ['Escalão', 'Distrito', 'Divisão', 'Clube'];
    this.seasons = ['Todas', '2018/2019', '2017/2018', '2016/2017', '2015/2016', '2014/2015'];
    this.number_filter_types = [
      'Igual a', 'Pelo menos', 'No máximo', 'Entre'
    ];
    this.mock_value_types = [
      'Valor 1', 'Valor 2', 'Valor 3', 'Valor 4'
    ];

    this.sliderRange = [4, 80];
  }

  loadAgeGroups() {
    // Todo: Get AgeGroups
    this.age_groups = [
      {
        id: '1',
        name: 'Petizes',
      },
      {
        id: '2',
        name: 'Traquinas',
      },
      {
        id: '3',
        name: 'Benjamins B',
      },
      {
        id: '4',
        name: 'Benjamins A',
      }, {
        id: '5',
        name: 'Infantis B',
      },
      {
        id: '6',
        name: 'Infantis A',
      }, {
        id: '7',
        name: 'Iniciados B',
      },
      {
        id: '8',
        name: 'Iniciados',
      }, {
        id: '9',
        name: 'Juvenis B',
      },
      {
        id: '10',
        name: 'Juvenis',
      }, {
        id: '11',
        name: 'Juniores B',
      },
      {
        id: '12',
        name: 'Juniores',
      }, {
        id: '13',
        name: 'Seniores',
      }
    ];
  }

  loadLeagues() {
    // Todo: Get Competitions
    this.leagues = [
      {
        id: '2',
        name: 'Liga Portuguesa'
      },
      {
        id: '3',
        name: 'II Liga'
      },
      {
        id: '2',
        name: 'AF Lisboa 1ª Divisão Série 1 2017/18'
      },
    ];
  }

  loadTeam() {
    // Todo: Get Team based on chosenLeague
    this.genericUserService.searchUser('', '', 'team')
      .subscribe(teams => this.teams = teams);
  }

  loadPlayers() {
    // Todo: Get Players based on
    this.genericUserService.detailedSearchUser()
      .subscribe(players => this.players = players);
  }

  changed(form) {
    // Todo: Get Players based on
    if (form)
      this.addFieldValue(form);

  }

  getTeam() {
    this.genericUserService.searchUser('', '', 'team')
      .subscribe(teams => this.teams = teams);
  }

  sortData(sort: Sort) {
    const data = this.players.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        default:
          return 0;
      }
    });
  }

  addFieldValue(form_values) {
    form_values.forEach((form_value, key) => {
      if (!this.search_fields.some(item => item.form == form_value))
        this.search_fields.push({
          form: form_value,
          filter: {},
          value: {}
        });
    });

  }

  deleteFieldValue(index) {
    this.search_fields.splice(index, 1);
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
