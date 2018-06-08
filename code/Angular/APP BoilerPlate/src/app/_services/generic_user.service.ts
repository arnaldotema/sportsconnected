import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {Recommendation} from '../_models/recommendation';
import {Search_entity_viewmodel} from '../_models/search_entity_viewmodel';

@Injectable()
export class Generic_UserService {

  mockUserInfo: UserInfoViewModel[] = [{
    user_id: 1,
    personal_info: {
      name: 'Diogo Pires',
      age: 25,
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      full_name: 'Diogo César Pontes Pires',
      positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
      height: 165,
      weight: 90,
      date_of_birth: '30-01-1993',
      nationality: 'Portugal',
      residence: 'Lisboa',
      foot: 'Direito',
      updated_at: '8-05-2018'
    },
    external_ids: {
      zerozero: 'none',
    },
    current_season: {
      season_id: 1,
      name: '17/18',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      stats: [
        {
          competition_name: 'Liga Portugal',
          competition_avatar: '/assets/Liga_Portugal_logo.png',
          games: 15,
          wins: 14,
          losses: 0,
          draws: 1,
          goals: 13,
          assists: 4,
          yellow_cards: 1,
          red_cards: 0,
          minutes_played: 1050
        },
        {
          competition_name: 'Taça de Portugal',
          competition_avatar: '/assets/Tacadaligalogo.png',
          games: 4,
          wins: 1,
          losses: 1,
          draws: 1,
          goals: 4,
          assists: 1,
          yellow_cards: 0,
          red_cards: 0,
          minutes_played: 280
        },
        {
          competition_name: 'Super Taça',
          competition_avatar: '/assets/9_imgbank_tp.png',
          games: 1,
          wins: 1,
          losses: 0,
          draws: 0,
          goals: 2,
          assists: 1,
          yellow_cards: 0,
          red_cards: 0,
          minutes_played: 90
        }
      ],
      games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    },
    previous_seasons: [],
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
    skill_set: [
      {
        name: 'Goleador',
        avatar: '/assets/scorer.png',
        endorsements: [33, 2, 2, 2, 2, 2, 2],
      },
      {
        name: 'Drible',
        avatar: '/assets/dribble.png',
        endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        name: 'Rapidez',
        avatar: '/assets/fast.png',
        endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      },
      {
        name: 'Passe',
        avatar: '/assets/passer.png',
        endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 22, 2, 2],
      },
      {
        name: 'Força',
        avatar: '/assets/strong.png',
        endorsements: [33, 1, 2, 3, 4, 5, 3, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, , 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 42, 2, 2, 2, 2, 2, 2, 2, 2],
      },
    ],
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
    achievements: [{
      id: '1',
      name: '5 jogos consecutivos a marcar golo.',
      user_id: '1',
      user_name: 'Pedro Alves',
      user_avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg',
      user_positions: ['Médio Ofensivo'],
      avatar: '/assets/scorer.png'
    },
      {
        id: '1',
        name: '3 hat-tricks numa época.',
        user_id: '1',
        user_name: 'Pedro Alves',
        user_avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg',
        user_positions: ['Médio Ofensivo'],
        avatar: '/assets/scorer.png'
      }],
    created_at: '8-05-2018',
    updated_at: '9-05-2018'
  }];
  requestOptions;

  constructor() {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  getUserInfo(id: string): Observable<UserInfoViewModel> {
    return of(this.mockUserInfo[id]);
  };

  createRecommendation(id: string, recommendation: Recommendation): Observable<Recommendation> {
    this.mockUserInfo[id].recommendations.top_5.push(recommendation);
    return of(recommendation);
  };

  searchUser(id: string, name: string): Observable<Search_entity_viewmodel[]> {

    let search_obj = [
      {
        name: 'Diogo Pires',
        team: 'Seixal FC',
        id: '1',
        type: 'player',
        avatar: 'http://d2dzjyo4yc2sta.cloudfront.net/?url=images.pitchero.com%2Fui%2F125944%2Fimage_5975f423b7033.jpg&w=400&h=400&t=square&q=40'
      },
      {
        name: 'Arnaldo Tema',
        team: 'Seixal FC',
        id: '2',
        type: 'player',
        avatar: 'http://d2dzjyo4yc2sta.cloudfront.net/?url=images.pitchero.com%2Fui%2F2302574%2F1520172295_0.jpg&w=400&h=400&t=square&q=40',
      },
      {
        name: 'Arnaldo Trindade',
        team: 'Renegados FC',
        id: '3',
        type: 'player',
        avatar: 'https://www.rochdaleafc.co.uk/api/image/cropandgreyscale/d5a90991-e926-4846-811f-6869cca31725/?preset=square&greyscale=false',
      },
      {
        name: 'Arnaldo da Trindade Tema',
        team: 'Irmandade FC',
        id: '4',
        type: 'player',
        avatar: 'http://d2dzjyo4yc2sta.cloudfront.net/?url=images.pitchero.com%2Fui%2F850305%2F1433704548_9318.jpg&w=800&h=800&t=square&q=25',
      },
      {
        name: 'Diogo César',
        team: 'Irmandade FC',
        id: '5',
        type: 'player',
        avatar: 'http://d2dzjyo4yc2sta.cloudfront.net/?url=images.pitchero.com%2Fui%2F3129895%2Fimage_59de1731ae51b.jpg&w=400&h=400&t=square&q=40',
      }
    ];

    return of(search_obj.filter(user => user.name.includes(name)));
  }

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
