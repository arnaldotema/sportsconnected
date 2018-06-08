import { Component, OnInit } from '@angular/core';
import { GenericUserService} from '../_services/generic_user.service';
import {AuthenticationService} from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';
import {Search_entity_viewmodel} from "../_models/search_entity_viewmodel";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchString: String;
  searchResults: Search_entity_viewmodel[];

  constructor(
    private authenticationService: AuthenticationService,
    private genericService : GenericUserService
  )
  {

  }

  ngOnInit() {
  }

  searchFor(searchString) {
    this.genericService.searchUser('',searchString,'')
      .subscribe(list => this.searchResults = list);
  }

  isAuthenticated() {
    return true;
  }

}
