import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TeamViewModel} from '../_models/team_viewmodel';
import {Sort} from '@angular/material';
import {TeamService} from '../_services/team.service';
import {UserInfoService} from "../_services/user_info.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit,AfterViewInit {

  viewModel: TeamViewModel;
  sortedData;
  id;
  constructor(private teamService : TeamService, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.id  = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(){

    this.teamService.getTeam(this.id)
      .subscribe(team => {
        this.sortedData = team.current_season.media.slice();
        return this.viewModel = team;
      });
  }

  sortData(sort: Sort) {
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

