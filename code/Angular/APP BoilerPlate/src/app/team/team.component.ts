import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TeamViewModel} from '../_models/team_viewmodel';
import { TeamService } from '../_services/team.service';
import { Chart } from 'chart.js';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit  {

  viewModel: TeamViewModel;
  teamService : TeamService;

  constructor(/*private teamService: TeamService, */public dialog: MatDialog) { }

  ngOnInit() {
    this.teamService = new TeamService();
    this.teamService.getTeam('0')
      .subscribe(team => this.viewModel = team);
  }

  hasClass(elementId, className) {
    let elem = document.getElementById(elementId);
    return (' ' + elem.className + ' ').indexOf(' ' + className+ ' ') > -1;
  }

  over(event, isOver){
    let elem = event.target;
    let newClassName = ' '+ 'over'+ ' ';
    isOver? elem.className += newClassName: elem.classList.remove('over');
  }

  changeTab(tabId){
    let newClassName = ' '+'current'+' ';
    if(document.getElementsByClassName('current')[0]){
      document.getElementsByClassName('current')[0].classList.remove('current');
      document.getElementById(tabId).className += newClassName;
    }
  }

}
