import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import {TeamViewModel} from '../_models/team_viewmodel';
import {Recommendation} from '../_models/recommendation';

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
        list: [1, 2, 3],
        top_5: [
          {
            author: {
              name: 'Arnaldo Tema',
              id: 2,
              avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg',
              team: {
                id: '1',
                acronym: 'SFC',
                avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
                name: 'Seixal FC',
              },
            },
            text: 'Sed imperdiet tellus tristique, porttitor velit condimentum, bibendum augue. Maecenas sit amet libero et urna consequat ultrices ut sit amet nulla. Mauris quis neque ut lacus elementum tempus.',
          },
          {
            author: {
              name: 'Nuno Carmo',
              id: 3,
              avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
              team: {
                id: '1',
                acronym: 'SFC',
                avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
                name: 'Seixal FC',
              },
            },
            text: 'Maecenas tortor elit, fermentum non aliquam quis, bibendum nec urna. Cras euismod justo nec nisl ullamcorper, eget gravida tellus tincidunt. Aliquam quis leo ligula.',
          },
          {
            author: {
              name: 'Vital de Carvalho',
              id: 4,
              avatar: 'https://openminds.swissre.com/static//images/profile-default.png',
              team: {
                id: '1',
                acronym: 'SFC',
                avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
                name: 'Seixal FC',
              },
            },
            text: 'Duis eu maximus nibh, in consequat dui. Suspendisse porttitor elit et turpis faucibus volutpat. Nunc et mi luctus, vehicula eros id, tincidunt ante.',
          },
          {
            author: {
              name: 'José Mourinho',
              id: 5,
              avatar: 'https://cdn.images.dailystar.co.uk/dynamic/58/photos/763000/620x/Jose-Mourinho-644644.jpg',
              team: {
                id: '1',
                acronym: 'SFC',
                avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
                name: 'Seixal FC',
              },
            },
            text: 'Cras vehicula diam id massa tempus sodales. Mauris gravida nunc sed pulvinar ornare. Quisque eu pulvinar augue. Curabitur a rutrum metus. Nam mattis, quam ut varius suscipit, lacus lorem sodales diam, ac fermentum quam nulla a orci. Aenean id tincidunt ex, sit amet commodo ligula. Nulla dui mi, consectetur sit amet justo sed, aliquam dictum mi. Aenean sit amet cursus enim.',
          },
          {
            author: {
              name: 'Jorge Jesus',
              id: 6,
              avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
              team: {
                id: '1',
                acronym: 'SFC',
                avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
                name: 'Seixal FC',
              },
            },
            text: 'Nunc interdum, mauris ut pharetra elementum, mauris nunc blandit augue, nec semper arcu risus ac orci. Curabitur sit amet mauris vel erat faucibus fringilla in vel ligula.',
          }
        ],
      },
      roster: {
        players: [
          {
            user_id: '1',
            name: 'Diogo Pires',
            avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
            age: 25,
            number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            age: 25, number: 30,
            positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
            nationality: 'Portugal',
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
            nationality: 'Portugal',
            residence: 'Manchester',
          },
          {
            user_id: '6',
            name: 'Jorge Jesus',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jorge_Jesus.jpg/1200px-Jorge_Jesus.jpg',
            age: 49,
            position: 'Treinador adjunto',
            nationality: 'Portugal',
            residence: 'Lisboa',
          },
          {
            user_id: '4',
            name: 'Vital de Carvalho',
            avatar: 'https://openminds.swissre.com/static//images/profile-default.png',
            age: 35,
            position: 'Treinador adjunto',
            nationality: 'Portugal',
            residence: 'Lisboa',
          },
          {
            user_id: '3',
            name: 'Nuno Carmo',
            avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
            age: 27,
            position: 'Preparador físico',
            nationality: 'Portugal',
            residence: 'Lisboa',
          },
        ]
      },
      media: [
        {
          title: 'Diogo Pires marca Hat-trick em jogo decisivo',
          author: 'A Bola.',
          date: '08-05-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/zyIgPqOpMWY',
          views: 53,
          shares: 8,
          likes: 20,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: 1,
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: 1
            }],
            player: [{
              name: 'Diogo Pires',
              id: 1
            }],
          }
        },
        {
          title: 'Arnaldo faz 25 anos!',
          author: 'A Bola.',
          date: '27-08-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/zyIgPqOpMWY',
          views: 1200,
          shares: 12,
          likes: 0,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci.',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: 1,
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: 1
            }],
            player: [{
              name: 'Diogo Pires',
              id: 1
            }],
          }
        },
        {
          title: 'Melhores momentos',
          author: 'A Bola.',
          date: '08-09-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/zyIgPqOpMWY',
          views: 93,
          shares: 45,
          likes: 90,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: 1,
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: 1
            }],
            player: [{
              name: 'Diogo Pires',
              id: 1
            }],
          }
        },
        {
          title: '15 Golos em 10 jogos.',
          author: 'A Bola.',
          date: '03-11-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/zyIgPqOpMWY',
          views: 200,
          shares: 12,
          likes: 20,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: 1,
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: 1
            }],
            player: [{
              name: 'Diogo Pires',
              id: 1
            }],
          }
        },
        {
          title: 'Campeão da Supermacia',
          author: 'A Bola.',
          date: '08-02-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/zyIgPqOpMWY',
          views: 2,
          shares: 0,
          likes: 0,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: 1,
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: 1
            }],
            player: [{
              name: 'Diogo Pires',
              id: 1
            }],
          }
        },
        {
          title: 'Diogo falha final da Taça de Portugal',
          author: 'A Bola.',
          date: '28-05-2018',
          image: 'https://static.noticiasaominuto.com/stockimages/1920/naom_5ac4042fdc0c4.jpg?1522795787',
          ref: '//www.youtube.com/embed/zyIgPqOpMWY',
          views: 40,
          shares: 40,
          likes: 13,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, lectus non maximus varius, nibh orci rutrum velit, rhoncus vehicula sapien quam efficitur orci',
          references: {
            leagues: [
              {
                name: 'Liga Portugal',
                id: 1,
              }
            ],
            team: [{
              name: 'Seixal FC',
              id: 1
            }],
            player: [{
              name: 'Diogo Pires',
              id: 1
            }],
          }
        },

      ],
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

  createRecommendation (id: string, recommendation: Recommendation): Observable<Recommendation> {
    this.mockTeams[id].recommendations.top_5.push(recommendation);
    return of(recommendation);
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
