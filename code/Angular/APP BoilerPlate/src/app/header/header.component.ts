import { Component, OnInit } from '@angular/core';
import { GenericUserService} from '../_services/generic_user.service';
import {AuthenticationService} from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';
import {Search_entity_viewmodel} from "../_models/search_entity_viewmodel";
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {UserInfoService} from '../_services/user_info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchString: string;
  searchResults: Search_entity_viewmodel[];
  viewModel: UserInfoViewModel;

  show_notifications: boolean;
  show_search: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private genericService : GenericUserService,
    private userInfoService : UserInfoService)
  {}

  ngOnInit() {
    this.userInfoService.getUserInfo('0')
      .subscribe(userInfo => this.viewModel = userInfo);

    this.show_notifications = false;
    this.show_search = false;
  }

  searchFor() {
    this.genericService.searchUser('',this.searchString,'')
      .subscribe(list => this.searchResults = list);
  }

  isAuthenticated() {
    return true;
  }

}
