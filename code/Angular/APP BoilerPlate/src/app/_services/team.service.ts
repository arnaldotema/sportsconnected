import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import {TeamViewModel} from '../_models/team_viewmodel';

@Injectable()
export class teamService {

  mockTeams: TeamViewModel[] = [
    {
      info: {
        name: 'Arnaldo Tema',
        avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',// https://instagram.flis6-1.fna.fbcdn.net/vp/84bab3a03bdb6a25f601411c863cce50/5B627DFE/t51.2885-15/e35/17663460_302726650145190_6548337581656899584_n.jpg',
        full_name: 'Arnaldo Lucien da Trindade Tema',
        positions: ['Avançado', 'Guarda-redes'],
        height: 191,
        weight: 87,
        date_of_birth: '',
        foot: 'Tripé',
      }
      ,
      team: {
        id: '0',
        acronym: 'ODB',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC'
      },
      current_season: {
        name: '17/18',
        id: '0',
        stats: {
          games: 200,
          goals: 4343,
          minutes_played: 6666,
          yellow_cards: 0,
          red_cards: 10
        }
      },
      media: {},
      skill_set: [
        {
          name: 'Basquetebol',
          avatar: 'https://seeklogo.com/images/B/bola-copa-brasil-2014-logo-2E974327EF-seeklogo.com.png',
          endorsements: 10000
        },
        {
          name: 'Grandade',
          avatar: 'https://seeklogo.com/images/B/bola-copa-brasil-2014-logo-2E974327EF-seeklogo.com.png',
          endorsements: 1000
        },
        {
          name: 'Seriedade',
          avatar: 'https://seeklogo.com/images/B/bola-copa-brasil-2014-logo-2E974327EF-seeklogo.com.png',
          endorsements: 100000
        },
        {
          name: 'Abananços',
          avatar: 'https://seeklogo.com/images/B/bola-copa-brasil-2014-logo-2E974327EF-seeklogo.com.png',
          endorsements: 10
        },
        {
          name: 'Calorias',
          avatar: 'https://seeklogo.com/images/B/bola-copa-brasil-2014-logo-2E974327EF-seeklogo.com.png',
          endorsements: 100
        }
      ],
      recommendations: {
        total_recommendations: 300,
        last_recommendations: [
          {
            author: {
              name: 'Diogo César',
              id: '0',
              avatar: 'https://i.pinimg.com/originals/6b/3b/a7/6b3ba707a5482505eba9ed1bd0a1aa67.jpg',
              team: {
                id: '0',
                acronym: 'PA',
                avatar: 'https://i.pinimg.com/originals/6b/3b/a7/6b3ba707a5482505eba9ed1bd0a1aa67.jpg',
                name: 'Programadores Autistas'
              }
            },
            text: 'O meu BFF que me ensina social skills! E ginásio! Mas ele é facilmente stressado e cheira a bufo constante'
          },
          {
            author: {
              name: 'Carolina Paracana',
              id: '0',
              avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/14380056_10154311412654457_4755765822824052414_o.jpg?_nc_cat=0&oh=676b7cdb8ead747250117393f4a72620&oe=5B715385',
              team: {
                id: '0',
                acronym: 'N',
                avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/14380056_10154311412654457_4755765822824052414_o.jpg?_nc_cat=0&oh=676b7cdb8ead747250117393f4a72620&oe=5B715385',
                name: 'Namoradas'
              }
            },
              text: 'O meu GRANDÃO <3'
            }
        ]
      }
    }
  ];

  /*
  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authenticationService.token
      })
    };
  }
  */

  requestOptions;

  constructor (){
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  getTeam(id: string): Observable<TeamViewModel> {
    return of(this.mockTeams[id]);
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
