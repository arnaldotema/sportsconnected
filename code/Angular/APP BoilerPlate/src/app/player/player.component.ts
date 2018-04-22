import { Component, OnInit } from '@angular/core';
import { PlayerViewModel } from '../_models/player_viewmodel'
import { PlayerService } from '../_services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  viewModel: PlayerViewModel;
  playerService : PlayerService;

  constructor() { }

  ngOnInit() {
    this.playerService = new PlayerService();
    this.playerService.getPlayer('0')
      .subscribe(player => this.viewModel = player);
  }

}
