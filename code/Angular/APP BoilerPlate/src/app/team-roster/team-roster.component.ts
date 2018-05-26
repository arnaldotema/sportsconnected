import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TeamViewModel} from '../_models/team_viewmodel';
import { TeamService } from '../_services/team.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.css']
})

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.css']
})
export class TeamRosterComponent implements OnInit, AfterViewInit  {

  viewModel: TeamViewModel;
  teamService: TeamService;

  constructor() { }

  ngOnInit() {
    this.teamService = new TeamService();
    this.teamService.getTeam('0')
      .subscribe(team => this.viewModel = team);
  }
  ngAfterViewInit(){
  }
}
