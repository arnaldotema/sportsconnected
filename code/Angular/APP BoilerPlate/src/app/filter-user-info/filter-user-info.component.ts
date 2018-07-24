import { Component, OnInit } from '@angular/core';
import {GenericUserService} from '../_services/generic_user.service';
import {Search_entity_viewmodel} from '../_models/search_entity_viewmodel';
import {Router} from '@angular/router';
import {UserInfoService} from '../_services/user_info.service';
import {TeamService} from '../_services/team.service';
import {UserInfoSearch} from '../_models/user_info_search';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-filter-user-info',
  templateUrl: './filter-user-info.component.html',
  styleUrls: ['./filter-user-info.component.css']
})
export class FilterUserInfoComponent implements OnInit {

  teamService: TeamService;
  chosenPlayer;
  chosenLeague;
  chosenGender;
  chosenAgeGroup;
  chosenTeam;
  genericUserService: GenericUserService;
  userInfoService: UserInfoService;
  teams: Search_entity_viewmodel[];
  age_groups;
  genders;
  leagues;
  players: UserInfoSearch[];
  user;

  constructor(private router: Router) {}

  ngOnInit() {
    this.teamService = new TeamService();
    this.genericUserService = new GenericUserService();
    this.userInfoService = new UserInfoService();
    this.genders = [
      {
        id: '1',
        name: 'Masculino',
      },
      {
        id: '2',
        name: 'Feminino',
      }
    ]
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
      },      {
        id: '5',
        name: 'Infantis B',
      },
      {
        id: '6',
        name: 'Infantis A',
      },      {
        id: '7',
        name: 'Iniciados B',
      },
      {
        id: '8',
        name: 'Iniciados',
      },      {
        id: '9',
        name: 'Juvenis B',
      },
      {
        id: '10',
        name: 'Juvenis',
      },      {
        id: '11',
        name: 'Juniores B',
      },
      {
        id: '12',
        name: 'Juniores',
      },      {
        id: '13',
        name: 'Seniores',
      }
    ]
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
    ];  }

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
        case 'Popular': return compare(+a.views, +b.views, isAsc);
        case 'Recente': return compare(a.date, b.date, isAsc);
        case 'Gostos': return compare(+a.likes, +b.likes, isAsc);
        default: return 0;
      }
    });
  }

}
