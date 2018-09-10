import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {User} from '../_models/user';

/***
 * Current Session User Service
 */
@Injectable()
export class UserService {

  mockUser: User = {
    email: 'arnaldo.trindade@closer.pt',
    password: 'password',
    name: 'Arnaldo Tema',
    avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg',
    last_login: '',
    subscription_expiration: '',
    id: '-1'
  };

  requestOptions;

  constructor() {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  getSessionUser(): Observable<User> {
    return of(this.mockUser);
  };

}
