import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {GenericUserService} from '../_services/generic_user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {Observable} from 'rxjs/Observable';
import {SearchEntityViewmodel} from "../_models/search_entity_viewmodel";
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {User} from "../_models/user";
import {SessionUser} from "../_models/session_user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchString: string;
  searchResults: SearchEntityViewmodel[];
  viewModel: any;

  show_notifications: boolean;
  show_search: boolean;


  //Login variables
  model: any = {};
  error = '';

  constructor(
    public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private authenticationService: AuthenticationService,
    private genericService: GenericUserService
  ) {}

  ngOnInit() {
    let session_user = this.authenticationService.getSessionUser();
    this.viewModel = session_user ? session_user : {}
    this.show_notifications = false;
    this.show_search = false;
  }

  searchFor() {
    this.genericService.searchUser('', this.searchString, '')
      .subscribe(list => this.searchResults = list);
  }

  isAuthenticated() {
    return this.authenticationService.isLogged();
  }

  logout() {
    this.authenticationService.logout();
  }

}
