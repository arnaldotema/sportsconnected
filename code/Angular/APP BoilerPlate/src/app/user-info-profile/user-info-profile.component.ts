import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import {Chart} from 'chart.js';
import {forEach} from '@angular/router/src/utils/collection';
import {MatDialog} from '@angular/material';
import {RecommendationModalComponent} from '../_modals/recommendation-modal/recommendation-modal.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user-info-profile',
  templateUrl: './user-info-profile.component.html',
  styleUrls: ['./user-info-profile.component.css']
})
export class UserInfoProfileComponent implements OnInit, AfterViewInit {
  viewModel: UserInfoViewModel;
  userInfoService: UserInfoService;
  mockAuthor;
  chart;
  colors;
  data;
  options;
  labels;
  skill_values;
  show = false;
  constructor(/*private userInfoService: UserInfoService, */public dialog: MatDialog) {
  }

  ngOnInit() {
    this.chart = [];
    this.data = {};
    this.options = {};
    this.labels = [];
    this.skill_values = [];
    this.colors = [{
      backgroundColor: 'rgba(77,83,96,0.2)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointHoverBackgroundColor: 'rgba(77,83,96,1)',
      borderColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,0.8)'
    }];

    this.userInfoService = new UserInfoService();
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
    };



  }

  ngAfterViewInit() {
    this.viewModel.skill_set.forEach((skill) => {
      this.labels.push(skill.name);
      this.skill_values.push(skill.endorsements.length);
    });

    this.data = {
      labels: this.labels, //['Dribble', 'Golos', 'Rapidez', 'Livres', 'Passe'],
      datasets: [{
        data: this.skill_values, //[19, 18, 14, 15, 23]
      }]
    };
    this.options = {
      color: [
        'red',    // color for data at index 0
        'blue',   // color for data at index 1
        'green',  // color for data at index 2
        'black',  // color for data at index 3
        //...
      ],
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            mirror: true
          },
          gridLines: {
            display: false
          }
        }]
      }
    };
    this.chart = new Chart('graph', {
      type: 'horizontalBar',
      data: this.data,
      options: this.options,
      colors: this.colors
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
      if (result !== undefined) {
        this.userInfoService.createRecommendation('0', result).subscribe();
        {
          // Todo: Add to the real team recommendation's list instead of the top 5
          this.viewModel.recommendations.top_5.push(result);
          //this.recommendationDataSource.filter = this.filterString;
        }
      }
    });
  }


  voteSkill(event): void {
    let skillName = event.target.title; // TODO: Should send the whole skill_set instead of just the name and then receive the whole skillSet as it is now
    this.userInfoService.voteForSkill(skillName, this.mockAuthor.id).subscribe();
    {
      this.labels.forEach(label => {
        if (label == skillName)
          ++this.skill_values[1];
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
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              mirror: true
            },
            gridLines: {
              display: false
            }
          }]
        }
      };
      this.chart = new Chart('graph', {
        type: 'horizontalBar',
        data: this.data,
        options: this.options
      });
    }
  }

}
