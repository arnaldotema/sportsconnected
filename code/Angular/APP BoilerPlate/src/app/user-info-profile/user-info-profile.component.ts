import {Component, OnInit, AfterViewInit, ViewContainerRef, AfterViewChecked} from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import {Chart} from 'chart.js';
import {forEach} from '@angular/router/src/utils/collection';
import {MatDialog} from '@angular/material';
import {RecommendationModalComponent} from '../_modals/recommendation-modal/recommendation-modal.component';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-user-info-profile',
  templateUrl: './user-info-profile.component.html',
  styleUrls: ['./user-info-profile.component.css']
})
export class UserInfoProfileComponent implements OnInit, AfterViewInit, AfterViewChecked {
  viewModel: UserInfoViewModel;
  mockAuthor;
  chart;
  colors;
  data;
  options;
  labels;
  skill_values;

  constructor(private userInfoService: UserInfoService, public dialog: MatDialog, private router: Router,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.data = {};
    this.options = {};
    this.labels = [];
    this.skill_values = [];
    this.colors = [];
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
    setTimeout(() =>{
      this.userInfoService.getUserInfo('0')
        .subscribe((userInfo) => {
          this.viewModel = userInfo;
          // When the user scrolls the page, execute myFunction
          window.onscroll = function() {stickyScroll()};
        });
    },2000);
  }

  ngAfterViewChecked(){
    if(this.viewModel && !this.chart){
      this.loadChart();
    }
  }


  editPlayer(): void {
    this.router.navigate(['/edit-user-info']);
  }

  loadChart () {
    this.viewModel.skill_set.forEach((skill) => {
      this.labels.push(skill.name);
      this.skill_values.push(skill.endorsements.length);
    });
    this.data = {
      labels: this.labels,
      datasets: [{
        data: this.skill_values, //[19, 18, 14, 15, 23]
        backgroundColor: [
          '#4383a882',
          '#4383a882',
          '#4383a882',
          '#4383a882',
          '#4383a882',
        ]
      }]
    };
    this.options = {
      title: {
        text: 'Vota nas "Skills" de ' + this.viewModel.personal_info.name,
        display: true
      },
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
    let ctx = document.getElementById('graph');
    this.chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: this.data,
      options: this.options,
      colors: this.colors
    });
    return true;
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

    this.toastr.success('Obrigado pelo voto!');

    let skillName = event.target.title; // TODO: Should send the whole skill_set instead of just the name and then receive the whole skillSet as it is now
    this.userInfoService.voteForSkill(skillName, this.mockAuthor.id).subscribe();
    {
      this.labels.forEach((label,key) => {
        if (label == skillName)
          ++this.skill_values[key];
      });
      /*
      this.data = {
        labels: this.labels,
        datasets: [{
          data: this.skill_values, //[19, 18, 14, 15, 23]
          backgroundColor: [
            '#4383a882',
            '#4383a882',
            '#4383a882',
            '#4383a882',
            '#4383a882',
          ]
        }]
      };
      this.options = {
        title: {
          text: 'Skills',
          display: true
        },
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
      */
    }
  }
}


// Add the sticky class to personal when you reach its scroll position.
// Remove "sticky" when you leave the scroll position
function stickyScroll() {

  // Get the navbar
  let personal = document.getElementById("personal");
  let achievements = document.getElementById("achievements");
  let indicators = document.getElementById("indicators");

  // Get the offset position of the personal
  let currOffset = personal.offsetTop;

  if (window.pageYOffset + 195 >= currOffset){
    personal.parentElement.classList.add("row-left");
    personal.classList.add("sticky");
  }

  if( window.pageYOffset < 286 ){
    personal.classList.remove("sticky");
  }

  if( window.pageYOffset > 2411){
    personal.classList.add("hidden-for-footer");
    achievements.classList.add("hidden-for-footer");
    indicators.classList.add("hidden-for-footer");
  }
  else{
    personal.classList.remove("hidden-for-footer");
    achievements.classList.remove("hidden-for-footer");
    indicators.classList.remove("hidden-for-footer");
  }
}
