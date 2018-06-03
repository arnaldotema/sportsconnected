import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Generic_UserService} from './_services/generic_user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  genericService : Generic_UserService;
  userList;
  constructor() {

  }

  searchFor(searchString) {
    // Return if inputed less than 3 characteres
    if (searchString.length < 3)
      return;

    // else call your api to search for
    this.genericService.searchUser('',searchString)
      .subscribe(list => this.userList = list);
  }

}
