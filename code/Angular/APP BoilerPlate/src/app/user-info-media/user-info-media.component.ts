import { Component, OnInit } from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import { Chart } from 'chart.js';
import {Sort} from '@angular/material';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-user-info-media',
  templateUrl: './user-info-media.component.html',
  styleUrls: ['./user-info-media.component.css']
})
export class User_infoMediaComponent implements OnInit{

  viewModel: UserInfoViewModel;
  sortedData;
  id;
  constructor(private userInfoService : UserInfoService, private route: ActivatedRoute) {}

  ngOnInit() {

    this.id  = this.route.snapshot.paramMap.get('id');
    this.userInfoService.getUserInfo(this.id)
      .subscribe(userInfo => {
        this.sortedData = userInfo.current_season.media.slice();
        return this.viewModel = userInfo;
      });
  }

  sortData(sort: Sort) {
    if(!this.viewModel.current_season.media){
      return;
    }
    const data = this.viewModel.current_season.media.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Popular': return compare(+a.views, +b.views, isAsc);
        case 'Recente': return compare(a.date, b.date, isAsc);
        case 'Gostos': return compare(+a.likes, +b.likes, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
