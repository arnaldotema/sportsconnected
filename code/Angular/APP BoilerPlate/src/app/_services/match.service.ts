import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import {MatchViewModel} from '../_models/match_viewmodel';
import {Achievement} from '../_models/achievement';

@Injectable()
export class MatchService {

  mockMatches: MatchViewModel[] = [
    {
      played: true,
      external_ids: {
        zerozero: 1
      },
      date: '27-08-2013',
      duration: 90,
      phase: 'Jornada 1',
      stadium: 'Municipal José Martins Vieira (POR) (Cova da Piedade - Almada)',
      referee: 'Nuno Miguel Serrano Almeida',
      competition: {
        name: 'Ledman LigaPro 2017/2018',
        avatar: 'http://www.zerozero.pt/img/logos/edicoes/87509_imgbank_.png',
        id: '1',
        external_ids: {
          zerozero: 1
        }
      },
      home_team: {
        id: '1',
        name: 'C. Piedade',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/6505_imgbank.png',
        goals: ['34', '44', '22'],
        achievements: [{
          id: '1',
          name: '5 jogos consecutivos a marcar golo.',
          user_id: '1',
          avatar: '/assets/scorer'
        }],
        main_lineup: [
          {
            name: 'Pedro Alves',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1,
            positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Adilson Lopes',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['41'],
            assists: [],
            yellow_cards: ['67'],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
        ],
        reserves: [
          {
            name: 'Romário Andrade',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0, positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: ['85'],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0, positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0, positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0, positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0, positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0, positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Lima Pereira',
            id: '4',
            external_ids: {
              zerozero: 1
            },
            number: 0, positions: ['Médio Centro'],
            goals: [],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 12,
            go_in: ['80'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
        ],
        coach: {
          name: 'Bruno Ribeiro',
          id: '1',
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
          nationality: 'Portugal',
          external_ids: {
            zerozero: 1
          }
        }
      },
      away_team: {
        id: '1',
        name: 'U. Madeira',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/22_imgbank.png',
        goals: ['11'],
        achievements: [{
          id: '2',
          name: '10 jogos consecutivos sem sofrer golo.',
          user_id: '1',
          avatar: '/assets/goal-keeper.png'
        }],
        main_lineup: [
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'José Chastre',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 1, positions: ['Avançado'],
            goals: ['67'],
            assists: [],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 90,
            go_in: [],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
        ],
        reserves: [
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24, positions: ['D. Central'],
            goals: [],
            assists: ['87'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24, positions: ['D. Central'],
            goals: [],
            assists: ['87'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24, positions: ['D. Central'],
            goals: [],
            assists: ['87'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24, positions: ['D. Central'],
            goals: [],
            assists: ['87'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
          {
            name: 'Tiago Almeira',
            id: '1',
            external_ids: {
              zerozero: 1
            },
            number: 24, positions: ['D. Central'],
            goals: [],
            assists: ['87'],
            yellow_cards: [],
            red_cards: [],
            minutes_played: 30,
            go_in: ['60'],
            go_out: [], avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg'
          },
        ],
        coach: {
          name: 'Ricardo Chéu',
          id: '1',
          avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
          nationality: 'Portugal',
          external_ids: {
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
