import {Component, Inject, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TeamService} from '../../_services/team.service';
import {TeamViewModel} from '../../_models/team_viewmodel';

@Component({
  selector: 'app-recommendation-modal',
  templateUrl: './recommendation-modal.component.html',
  styleUrls: ['./recommendation-modal.component.css']
})
export class RecommendationModalComponent implements OnInit {

  text: string;
  recommendationIdx: string;
  edit: false;
  create: true;
  author;

  constructor(
    public dialogRef: MatDialogRef<RecommendationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (this.data.author != null)
      this.author = this.data.author;
    this.text = '';

    /*
    if (this.data.recommendationIdx != null) {
      this.edit = true;
      this.recommendationIdx = this.data.recommendationIdx;
      this.text = this.data.recommendations[this.data.recommendationIdx];
    }
    */
  }

  ngOnInit() {
  }

  onCreateClick(): void {
    this.dialogRef.close({
      author : this.author,
      text: this.text
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
