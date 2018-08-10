import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TeamViewModel} from '../_models/team_viewmodel';
import {TeamService} from '../_services/team.service';
import {Chart} from 'chart.js';
import {MatDialog} from '@angular/material';
import {RecommendationModalComponent} from '../_modals/recommendation-modal/recommendation-modal.component';
import {TryoutModalComponent} from "../_modals/tryout-modal/tryout-modal.component";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css']
})
export class TeamProfileComponent implements OnInit, AfterViewInit {

  viewModel: TeamViewModel;
  session_user;
  chart = [];
  data = {};
  options = {};
  id;

  constructor(private teamService: TeamService, private authenticationService: AuthenticationService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    this.teamService.getTeam(this.id)
      .subscribe(team => {

        //Convert player's birth_date to age
        team.current_season.players.forEach((player) => {
          if (!player['date_of_birth']) player['date_of_birth'] = '1996-05-20T00:00:00.000Z';
          let birth_date = new Date(player['date_of_birth']);
          let ageDifMs = Date.now() - birth_date.getTime();
          let ageDate = new Date(ageDifMs);
          player['age'] = Math.abs(ageDate.getUTCFullYear() - 1970);
        });

        //Convert staff's birth_date to age
        team.current_season.staff.forEach((staff) => {
          if (!staff['date_of_birth']) staff['date_of_birth'] = '1979-05-20T00:00:00.000Z';
          let birth_date = new Date(staff['date_of_birth']);
          let ageDifMs = Date.now() - birth_date.getTime();
          let ageDate = new Date(ageDifMs);
          staff['age'] = Math.abs(ageDate.getUTCFullYear() - 1970);
        });

        //Convert player's name to short name
        team.current_season.players.forEach((player) => {
          player.name = player.name.split(' ')[0] + player.name.split(' ')[player.name.split(' ').length];
        });

        this.viewModel = team;
      });
    this.authenticationService.getSessionUser()
      .subscribe(userInfo => this.session_user = userInfo);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(RecommendationModalComponent,
      {
        data: {
          author: this.session_user,
          edit: false,
          create: true
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.teamService.createRecommendation('0', result).subscribe()
        {
          // Todo: Add to the real team recommendation's list instead of the top 5
          this.viewModel.recommendations.top_5.push(result);
          //this.recommendationDataSource.filter = this.filterString;
        }
      }
    });
  }

  openTryoutDialog(): void {
    const dialogRef = this.dialog.open(TryoutModalComponent,
      {
        data: {
          target: this.viewModel,
          author: this.session_user,
          edit: false,
          create: true
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        //this.teamService.createRecommendation('0',result).subscribe()
        {
          // Todo: Add to the real team recommendation's list instead of the top 5
          this.viewModel.tryouts.push(result);
          //this.recommendationDataSource.filter = this.filterString;
        }
      }
    });
  }

  openRecommendationsDialog(): void {
  }

}
