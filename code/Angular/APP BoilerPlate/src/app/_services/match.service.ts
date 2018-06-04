import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import {MatchViewModel} from '../_models/match_viewmodel';

@Injectable()
export class MatchService {

  mockMatches: MatchViewModel[] = [
    {
      played: true,
      external_ids: {
        zerozero: number
      },
      date: '27-08-2013',
      duration : 1,
      phase: 'Jornada 1',
      stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
      referee: 'Nuno Miguel Serrano Almeida',
      competition: {
        name: 'Ledman LigaPro 2017/2018',
        avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
        id: '1',
        external_ids:{
          zerozero: 1
        }
      },
      home_team : {
        name: 'Cova da Piedade',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',
        main_lineup:[
          {
            name: 'Pedro Alves',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [41],
            assists: [],
            yellow_cards: [67],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          ],
        reserves:[
          {
            name: 'Romário Andrade',
            id: '4',
            external_ids:{
              zerozero: 1
            },
            number: 0,
            goals: [],
            assists: [],
            yellow_cards: [85],
            red_cards: [],
            minutes_played: 12,
            go_in: [80],
            go_out: []
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids:{
              zerozero: 1
            },
            number: 0,
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: [80],
            go_out: []
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids:{
              zerozero: 1
            },
            number: 0,
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: [80],
            go_out: []
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids:{
              zerozero: 1
            },
            number: 0,
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: [80],
            go_out: []
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids:{
              zerozero: 1
            },
            number: 0,
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: [80],
            go_out: []
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids:{
              zerozero: 1
            },
            number: 0,
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: [80],
            go_out: []
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids:{
              zerozero: 1
            },
            number: 0,
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: [80],
            go_out: []
          },
          ],
        coach:{
          name: 'Bruno Ribeiro',
          id: '1',
          external_ids:{
            zerozero: 1
          }
        }
      },
      away_team : {
        name: 'U. Madeira',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',
        main_lineup:[
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 1,
            goals: [67],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: []
          },
          ],
        reserves:[
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 24,
            goals: [],
            assists: [87],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in:[60],
            go_out:[]
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 24,
            goals: [],
            assists: [87],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in:[60],
            go_out:[]
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 24,
            goals: [],
            assists: [87],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in:[60],
            go_out:[]
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 24,
            goals: [],
            assists: [87],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in:[60],
            go_out:[]
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids:{
              zerozero: 1
            },
            number: 24,
            goals: [],
            assists: [87],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in:[60],
            go_out:[]
          },
          ],
        coach:{
          name: 'Ricardo Chéu',
          id: '1',
          external_ids:{
            zerozero: 1
          }
        }
      }
    }
  ];

  requestOptions;

  constructor() {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  getMatch(id: string): Observable<MatchViewModel> {
    return of(this.mockMatches[id]);
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
