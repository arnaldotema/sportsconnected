import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import {MatDialog} from '@angular/material';
import {MatchViewModel} from '../_models/match_viewmodel';
import {MatchService} from '../_services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, AfterViewInit {

  viewModel: MatchViewModel;
  matchService : MatchService;

  constructor(/*private userInfoService: UserInfoService, */public dialog: MatDialog) {}

  ngOnInit() {
    this.matchService = new MatchService();
    this.matchService.getMatch('0')
      .subscribe(match => this.viewModel = match);
  }

  ngAfterViewInit(){}
}
