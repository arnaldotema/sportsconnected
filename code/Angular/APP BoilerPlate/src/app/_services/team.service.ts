import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import {TeamViewModel} from '../_models/team_viewmodel';

@Injectable()
export class TeamService {

  mockTeams: TeamViewModel[] = [
    {
      acronym: 'SFC',
      avatar: {
        type: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg'
      },
      name: 'Seixal FC',
      full_name: 'Seixal Futebol Clube',
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
            text: 'O meu BFF que me ensina social skills! E ginásio! Mas ele é facilmente stressado.'
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
      },
      roster: {
        players: [
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          },
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portuguesa',
            residence: 'Lisboa',
            stats: {
              games: 15,
              goals: 13,
              assists: 4,
              yellow_cards: 1,
              red_cards: 0,
              minutes_played: 1050
            }
          }
        ],
        staff: [
          {
            user_id: '5',
            name: 'José Mourinho',
            avatar: 'https://cdn.images.dailystar.co.uk/dynamic/58/photos/763000/620x/Jose-Mourinho-644644.jpg',
            age: 50,
            position: 'Treinador principal',
            nationality: 'Portuguesa',
            residence: 'Manchester',
          },
          {
            user_id: '6',
            name: 'Jorge Jesus',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            age: 49,
            position: 'Treinador adjunto',
            nationality: 'Portuguesa',
            residence: 'Lisboa',
          },
          {
            user_id: '4',
            name: 'Vital de Carvalho',
            avatar: 'https://openminds.swissre.com/static//images/profile-default.png',
            age: 35,
            position: 'Treinador adjunto',
            nationality: 'Portuguesa',
            residence: 'Lisboa',
          },
          {
            user_id: '3',
            name: 'Nuno Carmo',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            age: 27,
            position: 'Preparador físico',
            nationality: 'Portuguesa',
            residence: 'Lisboa',
          },
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

  constructor() {
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
