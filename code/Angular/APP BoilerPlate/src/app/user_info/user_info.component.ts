import { Component, OnInit, AfterViewInit } from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {User_infoService} from '../_services/user_info.service';
import { Chart } from 'chart.js';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-user-info',
  templateUrl: './user_info.component.html',
  styleUrls: ['./user_info.component.css']
})
export class User_infoComponent implements OnInit,AfterViewInit{

  viewModel: UserInfoViewModel;
  userInfoService : User_infoService;
  chart;
  data;
  options;
  labels;
  skill_values;
  constructor() { }

  ngOnInit() {

    this.chart = [];
    this.data = {};
    this.options = {};
    this.labels = [];
    this.skill_values = [];

    this.userInfoService = new User_infoService();
    this.userInfoService.getUserInfo('0')
      .subscribe(userInfo => this.viewModel = userInfo);
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
        display: false,
        yAxes: [{ticks: {mirror: true}}]
      }
    };

    this.chart = new Chart('graph', {
      type: 'horizontalBar',
      data: this.data,
      options: this.options
    });
  }
}
