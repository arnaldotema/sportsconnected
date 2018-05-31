import { Component, OnInit, AfterViewInit } from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {User_infoService} from '../_services/user_info.service';
import { Chart } from 'chart.js';
import {forEach} from '@angular/router/src/utils/collection';
import {MatDialog} from '@angular/material';
import {RecommendationModalComponent} from '../_modals/recommendation-modal/recommendation-modal.component';


@Component({
  selector: 'app-user-info',
  templateUrl: './user_info.component.html',
  styleUrls: ['./user_info.component.css']
})
export class User_infoComponent implements OnInit,AfterViewInit{

  viewModel: UserInfoViewModel;
  userInfoService : User_infoService;
  mockAuthor;
  chart;
  colours;
  data;
  options;
  labels;
  skill_values;
  constructor(/*private userInfoService: User_infoService, */public dialog: MatDialog) { }

  ngOnInit() {

    this.chart = [];
    this.data = {};
    this.options = {};
    this.labels = [];
    this.skill_values = [];
    this.colours = [{
      fillColor: 'rgba(47, 132, 71, 0.8)',
      strokeColor: 'rgba(47, 000, 71, 0.8)',
      highlightFill: 'rgba(47, 132, 0, 0.8)',
      highlightStroke: 'rgba(4, 132, 71, 0.8)',
    }];

    this.userInfoService = new User_infoService();
    this.userInfoService.getUserInfo('0')
      .subscribe(userInfo => this.viewModel = userInfo);

    this.mockAuthor = {
      name: 'Sports Connected',
      id: '-1',
      avatar: '/assets/default-profile.png',
      team: {
        id: '-1',
        acronym: 'SCT',
        avatar: '/assets/SP_Logo_Black.png',
        name: 'Sports Connected Team',
      }
    }
  }

  ngAfterViewInit(){
    this.viewModel.skill_set.forEach((skill)=>{
      this.labels.push(skill.name);
      this.skill_values.push(skill.endorsements);
    });

    this.data = {
      labels: this.labels, //['Dribble', 'Golos', 'Rapidez', 'Livres', 'Passe'],
      datasets: [{
        data: this.skill_values, //[19, 18, 14, 15, 23]
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
      },
      colours: this.colours
    };
    this.chart = new Chart('graph', {
      type: 'horizontalBar',
      data: this.data,
      options: this.options
    });
  }

  openCreateDialog(event): void {
    const dialogRef = this.dialog.open(RecommendationModalComponent,
      {
        data: {
          name: this.viewModel.personal_info.name,
          author: this.mockAuthor,
          edit: false,
          create: true
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result !== undefined) {
        this.userInfoService.createRecommendation('0',result).subscribe()
        {
          debugger;
          // Todo: Add to the real team recommendation's list instead of the top 5
          this.viewModel.recommendations.top_5.push(result);
          //this.recommendationDataSource.filter = this.filterString;
        }
      }
    });
  }
}
