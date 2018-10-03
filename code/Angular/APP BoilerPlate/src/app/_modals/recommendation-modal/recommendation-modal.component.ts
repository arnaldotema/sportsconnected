import {Component, Inject, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SessionUser} from "../../_models/session_user";

@Component({
  selector: 'app-recommendation-modal',
  templateUrl: './recommendation-modal.component.html',
  styleUrls: ['./recommendation-modal.component.css']
})
export class RecommendationModalComponent implements OnInit {

  text: string;
  relationship: string;
  recommendationIdx: string;
  edit: false;
  create: true;
  author;

  constructor(
    public dialogRef: MatDialogRef<RecommendationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { author: SessionUser, edit: boolean, create: boolean }
  ) {

    if (this.data.author != null)
      this.author = this.data.author;

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

  /**
   *     user_id: {type: Schema.Types.ObjectId, ref: 'football_user_info'},
   author: {
        author_type: String,
        name: String,
        relationship: String,
        id: String, // There's no Schema reference because it can be any type of user
        avatar: String,
        team: {
            id: {type: Schema.Types.ObjectId, ref: 'football_team'},
            acronym: String,
            avatar: String,
            name: String,
        },
    },
   text: String
   */
  onCreateClick(): void {
    this.dialogRef.close({
      author: this.author,
      text: this.text,
      relationship: this.relationship
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
