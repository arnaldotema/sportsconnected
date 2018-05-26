import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgSelectizeModule } from 'ng-selectize';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker';
import { ScrollToModule } from 'ng2-scroll-to-el';

import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard} from './_guards/admin.guard';
import { AuthenticationService} from './_services/authentication.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';

import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatChipsModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { TeamComponent } from './team/team.component';
import { MatchComponent } from './match/match.component';
import { CompetitionComponent } from './competition/competition.component';
import { User_infoComponent } from './user_info/user_info.component';
import { User_infoMediaComponent } from './user-info-media/user-info-media.component';
import { User_infoStatsComponent } from './user-info-stats/user-info-stats.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFiles: 1,
  acceptedFiles: 'application/pdf'
};

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    MatchComponent,
    CompetitionComponent,
    User_infoComponent,
    User_infoMediaComponent,
    User_infoStatsComponent,
    TeamRosterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ScrollToModule.forRoot(),
    MyDatePickerModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    NgSelectizeModule,
    DropzoneModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthenticationService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
