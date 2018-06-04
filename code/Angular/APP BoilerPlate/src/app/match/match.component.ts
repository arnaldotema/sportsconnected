import { Component, OnInit, AfterViewInit } from '@angular/core';
import {User_infoService} from '../_services/user_info.service';
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
  constructor(/*private userInfoService: User_infoService, */public dialog: MatDialog) {
    this.matchService = new MatchService();
    this.viewModel = this.matchService.getMatch('0');
  }

  ngOnInit() {}

  ngAfterViewInit(){}
}
