import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GenericUserService} from './_services/generic_user.service';
import {AuthenticationService} from './_services/authentication.service';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  genericService : GenericUserService;
  userList;
  http;
  private authenticationService: AuthenticationService;
  constructor() {
    //this.authenticationService = new AuthenticationService(this.http);
  }

  searchFor(searchString) {
    // Return if inputed less than 3 characteres
    if (searchString.length < 3)
      return;

    // else call your api to search for
    this.genericService.searchUser('',searchString, '')
      .subscribe(list => this.userList = list);
  }

  isAuthenticated(){
    return true;//this.authenticationService.isLogged();
  }

}
