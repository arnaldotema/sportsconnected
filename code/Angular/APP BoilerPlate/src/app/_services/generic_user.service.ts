import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {Search_entity_viewmodel} from '../_models/search_entity_viewmodel';
import {UserInfoSearch} from '../_models/user_info_search';

@Injectable()
export class GenericUserService {

  mockUserInfo: UserInfoSearch[] = [
    {
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
    followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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
      followers: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
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

  searchUser(id: string, name: string, type: string): Observable<Search_entity_viewmodel[]> {
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
      },
      {
        name: 'Seixal FC',
        team: 'Seixal FC',
        id: '1',
        type: 'team',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
      },
      {
        name: 'SL Benfica',
        team: 'SL Benfica',
        id: '2',
        type: 'team',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/4_imgbank.png',
      },
      {
        name: 'FC Porto',
        team: 'FC Porto',
        id: '3',
        type: 'team',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/9_imgbank.png',
      },
      {
        name: 'Seixal FC',
        team: 'Seixal FC',
        id: '1',
        type: 'team',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
      },
      {
        name: 'SL Benfica',
        team: 'SL Benfica',
        id: '2',
        type: 'team',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/4_imgbank.png',
      },
      {
        name: 'FC Porto',
        team: 'FC Porto',
        id: '3',
        type: 'team',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/9_imgbank.png',
      },
      {
        name: 'Seixal FC',
        team: 'Seixal FC',
        id: '1',
        type: 'team',
        avatar: 'https://seeklogo.com/images/S/seixal-cf-logo-C94D57D780-seeklogo.com.png',
      },
      {
        name: 'SL Benfica',
        team: 'SL Benfica',
        id: '2',
        type: 'team',
        avatar: 'http://www.zerozero.pt/img/logos/equipas/4_imgbank.png',
      }
    ];
    return of(search_obj.filter(item => item.name.includes(name) && (type == ''  || item.type == type)));
  }

  detailedSearchUser (): Observable<UserInfoSearch[]> {
    return of(this.mockUserInfo);
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
