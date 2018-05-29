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
export class TeamComponent implements OnInit,AfterViewInit  {

  viewModel: TeamViewModel;
  teamService : TeamService;
  chart = [];
  data = {};
  options = {};

  constructor(public dialog: MatDialog) { }

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
        xAxes: [{
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          ticks: {
            mirror: true
          },
          gridLines: {
            display:false
          }
        }]
      }
    };

    this.chart = new Chart('radar', {
      type: 'horizontalBar',
      data: this.data,
      options: this.options
    });
  }

  /*
  openCreateDialog(event): void {
    const dialogRef = this.dialog.open(RecommendationModalComponent,
      {
        data: {requirement: requirement, edit: true, create: true}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.ibbService.createRequirement(result).subscribe()
        {
          this.requirementsDataSource.data.push(result);
          this.requirementsDataSource.filter = this.filterString;
        }
      }
    });
  }
*/

}
