import {Component, OnInit} from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {User_infoService} from '../_services/user_info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user_info.component.html',
  styleUrls: ['./user_info.component.css']
})
export class User_infoComponent implements OnInit{

  viewModel: UserInfoViewModel;
  userInfoService : User_infoService;
  constructor() { }

  ngOnInit() {
    this.userInfoService = new User_infoService();
    this.userInfoService.getUserInfo('0')
      .subscribe(userInfo => this.viewModel = userInfo);
  }

  hasClass(elementId, className) {
    let elem = document.getElementById(elementId);
    return (' ' + elem.className + ' ').indexOf(' ' + className+ ' ') > -1;
  }

  over(event, isOver){
    let elem = event.target;
    let newClassName = ' '+ 'over'+ ' ';
    isOver? elem.className += newClassName: elem.classList.remove('over');
  }

  changeTab(tabId){
    let newClassName = ' '+'current'+' ';
    if(document.getElementsByClassName('current')[0]){
      document.getElementsByClassName('current')[0].classList.remove('current');
      document.getElementById(tabId).className += newClassName;
    }
  }
}
