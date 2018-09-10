import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TeamService} from '../_services/team.service';
import {UserInfoService} from '../_services/user_info.service';
import {GenericUserService} from '../_services/generic_user.service';
import {CompetitionService} from '../_services/competition.service';
import {SearchEntityViewmodel} from '../_models/search_entity_viewmodel';
import {TeamViewModel} from '../_models/team_viewmodel';
import {CompetitionViewModel} from "../_models/competition_viewmodel";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  chosenPlayer: SearchEntityViewmodel;
  chosenLeague: CompetitionViewModel;
  chosenGender;
  chosenAgeGroup;
  chosenTeam: any;
  teams: any[];
  age_groups;
  genders;
  leagues: CompetitionViewModel [];
  players: any[];
  user;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private competitionService: CompetitionService,
    private genericUserService: GenericUserService)
  {}

  ngOnInit() {
    this.loadLeagues();
  }

  loadLeagues() {
    // Todo: Get Competitions
    this.competitionService.getCompetitons()
      .subscribe(leagues => this.leagues = leagues);
  }

  loadTeam() {
    // Todo: Get Team based on chosenLeague
    this.teamService.getTeamsByLeague(this.chosenLeague._id)
      .subscribe(teams => this.teams = teams);
  }

  loadPlayersByTeam() {
    // Todo: Get Players based on chosenTeam
    this.teamService.getPlayers(this.chosenTeam.id)
      .subscribe(players => this.players = players);
  }

  loadPlayer() {
    this.router.navigate(['/edit-user-info/' + this.chosenPlayer.user_info_id]);
  }

  getTeam() {
    this.genericUserService.searchUser('', '', 'team.name')
      .subscribe(teams => this.teams = teams);
  }

  createPlayer() {

  }

}
