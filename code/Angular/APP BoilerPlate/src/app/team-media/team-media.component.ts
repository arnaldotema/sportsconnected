import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeamViewModel} from "../_models/team_viewmodel";
import {TeamService} from "../_services/team.service";
import {Sort} from "@angular/material";

@Component({
  selector: 'app-team-media',
  templateUrl: './team-media.component.html',
  styleUrls: ['./team-media.component.css']
})
export class TeamMediaComponent implements OnInit {

  viewModel: TeamViewModel;
  sortedData;
  id;
  constructor(private teamService : TeamService, private route: ActivatedRoute) {}

  ngOnInit() {

    this.id  = this.route.snapshot.paramMap.get('id');
    this.teamService.getTeam(this.id)
      .subscribe(team => {
        this.sortedData = team.current_season.media.slice();
        return this.viewModel = team;
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
