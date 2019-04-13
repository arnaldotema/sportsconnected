import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import {MatDialog} from '@angular/material';
import {MatchViewModel} from '../_models/match_viewmodel';
import {MatchService} from '../_services/match.service';
import {ActivatedRoute} from "@angular/router";
import {PlayerMatch} from "../_models/player_match";

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit, AfterViewInit {

  viewModel: MatchViewModel;
  homeTeamPlayers: PlayerMatch[];
  awayTeamPlayers: PlayerMatch[];
  id;
  selectizeConfig = {
    create: true,
    labelField: 'label',
    valueField: 'value',
    maxItems: 10
  };

  constructor(
    private matchService: MatchService,
    public dialog: MatDialog,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.id  = this.route.snapshot.paramMap.get('id');
    this.matchService.getMatch(this.id)
      .subscribe(match => {
        this.viewModel = match;
        this.homeTeamPlayers = this.viewModel.home_team.main_lineup;
        this.awayTeamPlayers = this.viewModel.away_team.main_lineup
        this.viewModel.home_team.main_lineup = new Array(11);
        this.viewModel.away_team.main_lineup = new Array(11);
      });
  }

  ngAfterViewInit() {

  }

  onPlayerDropHome(e: any, index) {
    // Get the dropped data here
    this.viewModel.home_team.main_lineup[index] = e.dragData;
  }

  onPlayerDropAway(e: any, index) {
    // Get the dropped data here
    this.viewModel.away_team.main_lineup[index] = e.dragData;
  }


}
