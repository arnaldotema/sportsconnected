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

  constructor(private matchService: MatchService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
      this.matchService.getMatch('')
        .subscribe(match => this.viewModel = match);
  }}
