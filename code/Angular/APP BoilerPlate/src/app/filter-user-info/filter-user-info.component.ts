import {Component, OnInit} from '@angular/core';
import {GenericUserService} from '../_services/generic_user.service';
import {SearchEntityViewmodel} from '../_models/search_entity_viewmodel';
import {Router} from '@angular/router';
import {UserInfoService} from '../_services/user_info.service';
import {UserInfoSearch} from '../_models/user_info_search';
import {Sort} from '@angular/material';
import {FilterSearch} from '../_models/filter_search';


@Component({
  selector: 'app-filter-user-info',
  templateUrl: './filter-user-info.component.html',
  styleUrls: ['./filter-user-info.component.css']
})
export class FilterUserInfoComponent implements OnInit {


  personal_data_select = [];
  stats_select = [];
  physical_atts_select;
  technical_atts_select;
  //mental_atts_select;
  sc_atts_select;
  competition_select;


  personal_data;
  physical_atts;
  technical_atts;
  mental_atts;
  sc_atts;
  competitions;
  seasons;
  stats;

  genericUserService: GenericUserService;
  teams: SearchEntityViewmodel[];
  age_groups;
  leagues;
  players: UserInfoSearch[];
  loading = false;
  user;

  sortedData;
  sliderRange;

  value_types;

  private search_fields: Array<FilterSearch> = [];

  constructor(private router: Router,
              private userInfoService : UserInfoService) {
  }

  ngOnInit() {
    this.genericUserService = new GenericUserService();
    this.personal_data = ['Pé Dominante', 'Idade', 'Posição', 'Residência', 'Mobilidade', 'D. de Nascimento',];
    this.stats = ['Época', 'Jogos', 'Minutos', 'Golos', 'Assistências', 'Class. média', 'C. Amarelos', 'C. Vermelhos'];
    this.physical_atts = ['Altura', 'Peso', 'Votação SC', 'Velocidade', 'Resistência', 'Força', 'Agilidade', 'Reflexos', 'Impulsão', 'Proteção de bola', 'Corpo a corpo'];
    this.technical_atts = ['Passe', 'Recepção', 'Drible', 'Remates Longe', 'Finalização', 'Cabeceamento', 'Cruzamento', 'Desarme', 'Primeiro toque', 'Lançamentos Laterais', 'Cantos', 'Livres diretos', 'Livres indiretos', 'Penalties'];
    this.mental_atts = ['Agressividade', 'Bravura', 'Antecipação', 'Concentração', 'Determinação', 'Compostura', 'Tomada de decisão', 'Criatividade', 'Jogo sem bola', 'Posicionamento', 'Velocidade Reação', 'Visão de Jogo', 'Disciplina', 'Ética de trabalho', 'Espírito de grupo', 'Liderança', 'Comunicação'];
    this.sc_atts = ['Badges', 'Badges Época', 'Badges Carreira'];
    this.competitions = ['Escalão', 'Distrito', 'Divisão', 'Clube'];

    this.value_types = {
      'default': {
        values: Array.apply(null, {length: 50}).map(Number.call, Number),
        suffix: '',
        filters: ['Exatamente', 'Pelo menos', 'No máximo', 'Entre']

      },
      'foot': {
        values: ['Direito', 'Esquerdo', 'Ambidestro'],
        suffix: '',
        filters: ['Joga com']
      },
      'birth_date': {
        values: ['1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'],
        suffix: '',
        filters: ['Exatamente', 'Desde', 'Até', 'Entre']
      },
      'age': {
        values: Array.apply(null, {length: 35}).map(Number.call, Number),
        suffix: 'anos',
        filters: ['Exatamente', 'Pelo menos', 'No máximo', 'Entre']
      },
      'residence': {
        values: ['Lisboa', 'Porto', 'Coimbra', 'Algarve', 'Setúbal', 'Santarém', 'Viseu', 'Leiria'],
        suffix: '',
        filters: ['Reside em']
      },
      'team': {
        values: ['Seixal FC', 'SL Benfica', 'FC Porto', 'Amora FC', 'Alcochetense', 'Montijo', 'Sporting CP'],
        suffix: '',
        filters: ['Joga no']
      },
      'mobility': {
        values: ['Total', 'Regional', 'Distrital'],
        suffix: '',
        filters: ['No máximo']
      },
      'position': {
        values: ['Guarda-redes', 'Defesa Central', 'Defesa Esquerdo', 'Defesa Direito', 'Defesa', 'Médio Defensivo', 'Médio Ofensivo', 'Médio Esquerdo', 'Médio Direito', 'Médio Centro', 'Ala Esquerdo', 'Ala Direito', 'Avançado',],
        suffix: '',
        filters: ['É natural como'],
      },
      'games': {
        values: Array.apply(null, {length: 50}).map(Number.call, Number),
        suffix: 'jogos',
        filters: ['Exatamente', 'Pelo menos', 'No máximo', 'Entre']
      },
      'minutes': {
        values: Array.apply(null, {length: 90}).map(Number.call, Number),
        suffix: 'mins',
        filters: ['Exatamente', 'Pelo menos', 'No máximo', 'Entre']
      },
      'goals': {
        values: Array.apply(null, {length: 100}).map(Number.call, Number),
        suffix: 'golos',
        filters: ['Exatamente', 'Pelo menos', 'No máximo', 'Entre']
      },
      'assists': {
        values: Array.apply(null, {length: 100}).map(Number.call, Number),
        suffix: 'ass.',
        filters: ['Exatamente', 'Pelo menos', 'No máximo', 'Entre']
      },
      'height': {
        values: ['1,20', '1,50', '1,70', '1,80', '1,90', '2,00'],
        suffix: 'm',
        filters: ['Exatamente', 'Pelo menos', 'No máximo', 'Entre']
      },
      'weight': {
        values: ['50', '60', '70', '80', '90'],
        suffix: 'kg',
        filters: ['Exatamente', 'Pelo menos', 'No máximo', 'Entre']
      },
      'age_group': {
        values: ['Petizes', 'Traquinas', 'Benjamins B', 'Benjamins A', 'Infantis B', 'Infantis A', 'Iniciados B', 'Iniciados', 'Juvenis B', 'Juvenis', 'Juniores B', 'Juniores', 'Seniores'],
        suffix: '',
        filters: ['Exatamente', 'Desde', 'Até', 'Entre']
      },
      'district': {
        values: ['Lisboa', 'Porto', 'Setúbal', 'Santarém', 'Faro'],
        suffix: '',
        filters: ['Joga em/no']
      },

      'division': {
        values: ['Nacional', 'Regional', 'Distrital', '1ª Div', '2ª Div', '3ª Div'],
        suffix: '',
        filters: ['Joga na']
      },
      'season': {
        values: ['2018/2019', '2017/2018', '2016/2017', '2015/2016', '2014/2015'],
        suffix: '',
        filters: ['Exatamente', 'Desde', 'Até', 'Entre']
      }
    };
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
    this.loading = true;
    setTimeout(() =>{
      this.genericUserService.detailedSearchUser(this.search_fields)
        .subscribe(players => {
            this.loading = false;
            this.players = players;
            this.sortedData = this.players.slice();
          }
        );
    },2000);

  }

  changed(form) {

    // Cleans current player list if the filters were cleaned
    if(this.search_fields.length == 0){
      this.players = undefined;
    }

    // Todo: Get Players based on
    if (form)
      this.addFieldValue(form);

    // Reset the selected fileds
    this.personal_data_select = undefined;
    this.competition_select = undefined;
    this.physical_atts_select = undefined;
    this.sc_atts_select = undefined;
    this.technical_atts_select = undefined;

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
      debugger;
      switch (sort.active) {
        case 'age': return compare(+a.personal_info.age, +b.personal_info.age, !isAsc);
        case 'games': return compare(+a.current_season.games.length, b.current_season.games.length, !isAsc);
        case 'goals': return compare(+a.current_season.stats[0].goals, +b.current_season.stats[0].goals, !isAsc);
        case 'assists': return compare(+a.current_season.stats[0].assists, +b.current_season.stats[0].assists, !isAsc);
        case 'height': return compare(+a.personal_info.height, +b.personal_info.height,!isAsc);
        case 'weight': return compare(+a.personal_info.weight, +b.personal_info.weight, !isAsc);
        default: return 0;
      }
    });
  }

  addFieldValue(form_values) {
    form_values.forEach((form_value, key) => {
      if (!this.search_fields.some(item => item.form == form_value)) {
        let mapped_var = mapVariable(form_value);
        let obj = this.value_types[mapped_var] ? this.value_types[mapped_var] : this.value_types['default'];
        this.search_fields.push({
          form: form_value,
          search_item: mapped_var,
          filters: obj.filters,
          values: obj.values,
          selected_filter: '',
          selected_value: '',
          selected_value_end: '',
          value_suffix: obj.suffix
        });
      }
    });
  }

  deleteFieldValue(index) {
    this.search_fields.splice(index, 1);
  }
}

function mapVariable(text) {
  let translated = '';

  switch (text) {
    case 'Pé Dominante':
      translated = 'foot';
      break;
    case 'Posição':
      translated = 'position';
      break;
    case 'Idade':
      translated = 'age';
      break;
    case 'Residência':
      translated = 'residence';
      break;
    case 'Clube':
      translated = 'team';
      break;
    case 'Mobilidade':
      translated = 'mobility';
      break;
    case 'Época':
      translated = 'season';
      break;
    case 'Jogos':
      translated = 'games';
      break;
    case 'D. de Nascimento':
      translated = 'birth_date';
      break;
    case 'Minutos':
      translated = 'minutes';
      break;
    case 'Golos':
      translated = 'goals';
      break;
    case 'Assistências':
      translated = 'assists';
      break;
    case 'Altura':
      translated = 'height';
      break;
    case 'Peso':
      translated = 'weight';
      break;
    case 'Escalão':
      translated = 'age_group';
      break;
    case 'Distrito':
      translated = 'district';
      break;
    case 'Divisão':
      translated = 'division';
      break;
    default:
      translated = '';
  }

  return translated;
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
