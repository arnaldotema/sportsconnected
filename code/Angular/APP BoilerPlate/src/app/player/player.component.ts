import {AfterViewInit, Component, OnInit} from '@angular/core';
import { PlayerViewModel } from '../_models/player_viewmodel'
import { PlayerService } from '../_services/player.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit,AfterViewInit {

  viewModel: PlayerViewModel;
  playerService : PlayerService;
  chart = [];
  data = {};
  options = {};

  constructor() { }

  ngOnInit() {
    this.playerService = new PlayerService();
    this.playerService.getPlayer('0')
      .subscribe(player => this.viewModel = player);
  }

  ngAfterViewInit(){
    this.data = {
      labels: ['Dribble', 'Golos', 'Rapidez', 'Livres', 'Passe'],
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

