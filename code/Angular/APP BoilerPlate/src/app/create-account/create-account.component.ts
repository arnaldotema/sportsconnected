import { Component, OnInit } from '@angular/core';
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
  genericUserService: GenericUserService;
  userInfoService: UserInfoService;
  teams: Search_entity_viewmodel;
  team: TeamViewModel;
  user;

  constructor() { }

  ngOnInit() {
    this.teamService = new TeamService();
    this.genericUserService = new GenericUserService();
    this.userInfoService = new UserInfoService();
    this.genericUserService.searchUser('','','team')
      .subscribe(teams => this.teams = teams);
  }

  getPlayer(id: string){
    this.userInfoService.getUserInfo(id)
      .subscribe(user => this.user = user);
  }

  getTeam (id: string){
    this.teamService.getTeam(id)
      .subscribe(team => this.team = team);
  }

  createPlayer (){

  }


}
