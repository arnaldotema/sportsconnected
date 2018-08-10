import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../_models/user";
import {UserService} from './user.service';


@Injectable()
export class AuthenticationService {
  public token: string;
  public admin: boolean;
  public testing: boolean = true;
  private logged: boolean = true;

  session_user : User;

  constructor(private http: HttpClient, private userService: UserService) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.admin = currentUser && currentUser.admin;
  }

  getSessionUser(): Observable<User> {
    return this.userService.getSessionUser();
  }

  login(username: string, password: string): Observable<boolean> {
    if (this.testing) {
      if (username === 'user') {
        localStorage.setItem('currentUser', JSON.stringify(
          {username: username, token: '', admin: false}));
        this.token = '';
        this.admin = false;
        return of(true);
      }
      else if (username === 'admin') {
        localStorage.setItem('currentUser', JSON.stringify(
          {username: username, token: '', admin: true}));
        this.token = '';
        this.admin = true;
        return of(true);
      }
      else {
        return of(false);
      }
    }
    else {
      return this.http.post<any>('http://localhost:3000/authenticate', JSON.stringify({name: username, password: password}))
        .map((json) => {
          // login successful if there's a jwt token in the response
          if (json.token) {
            // set token property
            this.token = json.token;
            this.admin = json.admin;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(
              {username: username, token: json.token, admin: json.admin}
            ));

            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        });
    }
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    this.admin = null;
    this.logged = false;
    localStorage.removeItem('currentUser');
  }

  isLogged(): boolean {
    return true;
  }
}
