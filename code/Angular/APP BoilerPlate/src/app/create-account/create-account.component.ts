import {Component, OnInit} from '@angular/core';
import {TeamService} from '../_services/team.service';
import {UserInfoService} from '../_services/user_info.service';
import {GenericUserService} from '../_services/generic_user.service';
import {Search_entity_viewmodel} from '../_models/search_entity_viewmodel';
import {TeamViewModel} from '../_models/team_viewmodel';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  teamService: TeamService;
  chosenPlayer;
  chosenLeague;
  chosenTeam;
  genericUserService: GenericUserService;
  userInfoService: UserInfoService;
  teams: Search_entity_viewmodel[];
  leagues;
  players: Search_entity_viewmodel[];
  user;

  constructor() {
  }

  ngOnInit() {
    this.teamService = new TeamService();
    this.genericUserService = new GenericUserService();
    this.userInfoService = new UserInfoService();
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
    // Todo: Get Players based on chosenTeam
    this.genericUserService.searchUser('', '', 'player')
      .subscribe(players => this.players = players);
  }

  getTeam() {
    this.genericUserService.searchUser('', '', 'team')
      .subscribe(teams => this.teams = teams);
  }

  createPlayer() {

  }


}
