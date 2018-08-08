import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {SearchEntityViewmodel} from '../_models/search_entity_viewmodel';
import {UserInfoSearch} from '../_models/user_info_search';
import {FilterSearch} from '../_models/filter_search';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class GenericUserService {

  //TODO change to mockUserInfo: UserInfoSearch[] = [
  mockUserInfo = [
    {
      name: 'Cristiano Ronaldo',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
      user_id: '1',
      personal_info: {
        name: 'Cristiano Ronaldo',
        age: 22,
        avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Nuno Carmo',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
      user_id: '1',
      personal_info: {
        name: 'Nuno Carmo',
        age: 25,
        avatar: 'https://scontent.fopo3-1.fna.fbcdn.net/v/t31.0-8/15541052_10212069863200855_2889012374229061166_o.jpg?_nc_cat=0&oh=5b128be1ebf4151ec5aa2afb671b72d0&oe=5B8C9375',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 170,
        weight: 90,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Diogo Pires',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Diogo Pires',
        age: 25,
        avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 95,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Arnaldo Tema',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg',
      user_id: '1',
      personal_info: {
        name: 'Arnaldo Tema',
        age: 25,
        avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 25,
            assists: 4,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Flávio Fonseca',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Flávio Fonseca',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        games: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      },
      previous_seasons: [],
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Diogo Pires',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 6,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Naldo',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg',
      user_id: '1',
      personal_info: {
        name: 'Naldo',
        age: 25,
        avatar: 'https://instagram.fopo3-1.fna.fbcdn.net/vp/280bf4e91fb6132ebfd883e5abe1c8cd/5B9606E3/t51.2885-15/sh0.08/e35/p750x750/21149434_119212105368031_177014972570664960_n.jpg',
        full_name: 'Diogo César Pontes Pires',
        positions: ['Médio Centro', 'Médio Defensivo', 'Defesa Central'],
        height: 165,
        weight: 70,
        date_of_birth: '30-01-1993',
        nationality: 'Portugal',
        residence: 'Lisboa',
        foot: 'Direito',
        updated_at: '8-05-2018'
      },
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
            competition_name: 'Liga Portugal',
            competition_avatar: '/assets/Liga_Portugal_logo.png',
            games: 15,
            wins: 14,
            losses: 0,
            draws: 1,
            goals: 13,
            assists: 1,
            yellow_cards: 1,
            red_cards: 0,
            minutes_played: 1050
          },
          {
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Roberto',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
      user_id: '1',
      personal_info: {
        name: 'Roberto',
        age: 25,
        avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Diogo Pires',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Diogo Pires',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Emanuelle Robirstkoviskovic',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
      user_id: '1',
      personal_info: {
        name: 'Emanuelle Robirstkoviskovic',
        age: 25,
        avatar: 'https://e3.365dm.com/18/07/1096x616/skynews-cristiano-ronaldo-football_4358475.jpg?20180710164507',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Thierry Henry',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
      personal_info: {
        name: 'Thierry Henry',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
    {
      name: 'Diogo Pires',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',
      avatar: 'https://connectnigeria.com/articles/wp-content/uploads/2017/12/Arsenal-legend-Thierry-Henry-624927.jpg',
      user_id: '1',
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
      followers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            season: '2017/18',
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
            season: '2017/18',
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
            season: '2017/18',
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
        list: [1, 2, 3]
      },
      achievements: [
        {
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
        }
      ],
    },
  ]


  //TODO ALTT: search_obj: SearchEntityViewmodel[] = [
  search_obj = [
    {
      name: 'Diogo Pires',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      },
      id: '1',
      type: 'player',

      avatar: 'http://d2dzjyo4yc2sta.cloudfront.net/?url=images.pitchero.com%2Fui%2F125944%2Fimage_5975f423b7033.jpg&w=400&h=400&t=square&q=40'
    },
    {
      name: 'Arnaldo Tema',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      }, id: '2',
      type: 'player',
      avatar: 'http://d2dzjyo4yc2sta.cloudfront.net/?url=images.pitchero.com%2Fui%2F2302574%2F1520172295_0.jpg&w=400&h=400&t=square&q=40',
    },
    {
      name: 'Arnaldo Trindade',
      team: {
        id: 1,
        acronym: 'RFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Renegados FC'
      },
      id: '3',
      type: 'player',
      avatar: 'https://www.rochdaleafc.co.uk/api/image/cropandgreyscale/d5a90991-e926-4846-811f-6869cca31725/?preset=square&greyscale=false',
    },
    {
      name: 'Arnaldo da Trindade Tema',
      team: {
        id: 1,
        acronym: 'IFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Irmandade FC',
        full_name: 'Irmandade FC'
      },
      id: '4',
      type: 'player',
      avatar: 'http://d2dzjyo4yc2sta.cloudfront.net/?url=images.pitchero.com%2Fui%2F850305%2F1433704548_9318.jpg&w=800&h=800&t=square&q=25',
    },
    {
      name: 'Diogo César',
      team: {
        id: 1,
        acronym: 'IFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Irmandade FC',
        full_name: 'Irmandade FC'
      },
      id: '5',
      type: 'player',
      avatar: 'http://d2dzjyo4yc2sta.cloudfront.net/?url=images.pitchero.com%2Fui%2F3129895%2Fimage_59de1731ae51b.jpg&w=400&h=400&t=square&q=40',
    },
    {
      name: 'Seixal FC',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      }, id: '1',
      type: 'team',
      avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
    },
    {
      name: 'SL Benfica',
      team: {
        id: 1,
        acronym: 'SLB',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'SL Benfica',
        full_name: 'SL Benfica'
      },
      id: '2',
      type: 'team',
      avatar: 'http://www.zerozero.pt/img/logos/equipas/4_imgbank.png',
    },
    {
      name: 'FC Porto',
      team: {
        id: 1,
        acronym: 'FCP',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'FC Porto',
        full_name: 'FC Porto'
      },
      id: '3',
      type: 'team',
      avatar: 'http://www.zerozero.pt/img/logos/equipas/9_imgbank.png',
    },
    {
      name: 'Seixal FC',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      }, id: '1',
      type: 'team',
      avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
    },
    {
      name: 'SL Benfica',
      team: {
        id: 1,
        acronym: 'SLB',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'SL Benfica',
        full_name: 'SL Benfica'
      },
      id: '2',
      type: 'team',
      avatar: 'http://www.zerozero.pt/img/logos/equipas/4_imgbank.png',
    },
    {
      name: 'FC Porto',
      team: {
        id: 1,
        acronym: 'FCP',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'FC Porto',
        full_name: 'FC Porto'
      },
      id: '3',
      type: 'team',
      avatar: 'http://www.zerozero.pt/img/logos/equipas/9_imgbank.png',
    },
    {
      name: 'Seixal FC',
      team: {
        id: 1,
        acronym: 'SFC',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'Seixal FC',
        full_name: 'Seixal Futebol Clube'
      }, id: '1',
      type: 'team',
      avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
    },
    {
      name: 'SL Benfica',
      team: {
        id: 1,
        acronym: 'SLB',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
        name: 'SL Benfica',
        full_name: 'SL Benfica'
      },
      id: '2',
      type: 'team',
      avatar: 'http://www.zerozero.pt/img/logos/equipas/4_imgbank.png',
    }
  ];
  testing: boolean = false;
  requestOptions;

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authenticationService.token
      })
    };
  }

  //TODO: ALTT - Change input params to just a Filter_Search model
  // TODO ALTT - and algo:     searchUser(id: string, name: string, type: string): Observable<SearchEntityViewmodel[]> {
  searchUser(id: string, query: string, type: string): Observable<any[]> {
    if (this.testing) {
      return of(this.search_obj.filter(item => item.name.includes(name) && (type == '' || item.type == type)));
    }

    let body = [];
    if (type) {
      body.push(
        {
          search_item: type,
          selected_filter: '$regex',
          selected_value: query
        }
      );
    }
    else {
      body.push(
        {
          search_item: 'team.name',
          selected_filter: '$regex',
          selected_value: query
        },
        {
          search_item: 'personal_info.name',
          selected_filter: '$regex',
          selected_value: query
        }
      );
    }

    return this.http.post<SearchEntityViewmodel[]>('/players/search', {body}, this.requestOptions)
      .pipe(
        tap(data => console.log('POST Player Search', data)),
        catchError(this.handleError)
      );
  }

  //detailedSearchUser(search_obj: Array<FilterSearch>): Observable<UserInfoSearch[]> {
  detailedSearchUser(search_obj: Array<FilterSearch>): Observable<any[]> {
    debugger;
    if (this.testing){
      return of(this.mockUserInfo);
    }
    return this.http.post<SearchEntityViewmodel[]>('/players/search', {search_obj}, this.requestOptions)
      .pipe(
        tap(data => console.log('POST Player Search', data)),
        catchError(this.handleError)
      );
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
