import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {User} from '../_models/user';

@Injectable()
export class userService {

  mockUser: User = {
    email: 'arnaldo.trindade@closer.pt',
    password: 'password',
    last_login: '',
    subscription_expiration: ''
  };

  requestOptions;

  constructor() {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  getUser(id: string): Observable<User> {
    return of(this.mockUser);
  };

}
