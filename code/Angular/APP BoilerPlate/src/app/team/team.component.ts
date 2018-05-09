import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TeamViewModel} from '../_models/team_viewmodel';
import { TeamService } from '../_services/team.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit,AfterViewInit  {

  viewModel: TeamViewModel;
  teamService : TeamService;
  chart = [];
  data = {};
  options = {};

  constructor() { }

  ngOnInit() {
    this.teamService = new TeamService();
    this.teamService.getTeam('0')
      .subscribe(team => this.viewModel = team);
  }

  ngAfterViewInit(){
    this.data = {
      labels: ['Ataque', 'Tática', 'Defesa', 'Meio Campo', 'Bolas paradas'],
      datasets: [{
        data: [19, 18, 14, 15, 23]
      }]
    };

    this.options = {
      legend: {
        display: false
      },
      scales: {
        display: false,
        yAxes: [{ticks: {mirror: true}}]
      }
    };

    this.chart = new Chart('radar', {
      type: 'horizontalBar',
      data: this.data,
      options: this.options
    });
  }


}
