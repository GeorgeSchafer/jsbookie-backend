import ReplitDB from '../libs/ReplitDB/ReplitDB.mjs';

const db = new ReplitDB()
const base = 'https://api.the-odds-api.com';
const sports = `/v4/sports?apiKey=${process.env.apiKey}`;
const odds = `/v4/sports/:sport_key/odds/?apiKey=${process.env.apiKey}`;
const markets = `&markets=us`;
const regions = `&regions=us`;

const abbr_sports = [
    {
        abbr: 'cfl',
        key: 'americanfootball_cfl',
    },
    {
        abbr: 'ncaa',
        key: 'americanfootball_ncaaf',
    },
    {
        abbr: 'nfl',
        key: 'americanfootball_nfl',
    },
    {
        abbr: 'nfl-championship',
        key: 'americanfootball_nfl_super_bowl_winner',
    },
    {
        abbr: 'mlb',
        key: 'baseball_mlb',
    },
    {
        abbr: 'mlb-champtionship',
        key: 'baseball_mlb_world_series_winner',
    },
    {
        abbr: 'eba',
        key: 'basketball_euroleague',
    },
    {
        abbr: 'nba',
        key: 'basketball_nba',
    },
    {
        abbr: 'wnba',
        key: 'basketball_wnba',
    },
    {
        abbr: 'box',
        key: 'boxing_boxing',
    },
    {
        abbr: 'icc-championship',
        key: 'cricket_icc_world_cup',
    },
    {
        abbr: 'mma',
        key: 'mma_mixed_martial_arts',
    },
    {
        abbr: 'rugb-champtionship',
        key: 'rugbyunion_world_cup',
    },
    {
        abbr: 'ufb',
        key: 'soccer_usa_mls',
    },
    {
        abbr: 'nba-champtionship',
        key: 'basketball_nba_championship_winner',
    },
    {
        abbr: 'nba-preseason',
        key: 'basketball_nba_preseason',
    },
    {
        abbr: '',
        key: 'golf_masters_tournament_winner',
    },
    {
        abbr: '',
        key: 'golf_pga_championship_winner',
    },
    {
        abbr: 'usopen',
        key: 'golf_us_open_winner',
    },
    {
        abbr: 'nhl-championship',
        key: 'icehockey_nhl_championship_winner',
    },
    {
        abbr: '',
        key: 'icehockey_sweden_allsvenskan',
    },
    {
        abbr: 'shl',
        key: 'icehockey_sweden_hockey_league',
    },
    {
        abbr: 'afb',
        key: 'soccer_australia_aleague',
    },
    {
        abbr: '',
        key: 'soccer_austria_bundesliga',
        group: 'Soccer',
    },
    {
        abbr: '',
        key: 'soccer_belgium_first_div',
        group: 'Soccer',
    },
    {
        abbr: '',
        key: 'soccer_brazil_campeonato',
    },
    {
        abbr: '',
        key: 'soccer_brazil_serie_b',
    },
    {
        abbr: '',
        key: 'soccer_chile_campeonato',
    },
    {
        abbr: '',
        key: 'soccer_conmebol_copa_libertadores',
    },
    {
        abbr: '',
        key: 'soccer_denmark_superliga',
    },
    {
        abbr: '',
        key: 'soccer_efl_champ',
    },
    {
        abbr: '',
        key: 'soccer_england_efl_cup',
    },
    {
        abbr: '',
        key: 'soccer_england_league1',
    },
    {
        abbr: '',
        key: 'soccer_england_league2',
    },
    {
        abbr: '',
        key: 'soccer_epl',
    },
    {
        abbr: '',
        key: 'soccer_finland_veikkausliiga',
    },
    {
        abbr: '',
        key: 'soccer_france_ligue_one',
    },
    {
        abbr: '',
        key: 'soccer_france_ligue_two',
    },
    {
        abbr: '',
        key: 'soccer_germany_bundesliga',
    },
    {
        abbr: '',
        key: 'soccer_germany_bundesliga2',
    },
    {
        abbr: '',
        key: 'soccer_germany_liga3',
    },
    {
        abbr: '',
        key: 'soccer_greece_super_league',
    },
    {
        abbr: '',
        key: 'soccer_italy_serie_a',
    },
    {
        abbr: '',
        key: 'soccer_italy_serie_b',
    },
    {
        abbr: '',
        key: 'soccer_japan_j_league',
    },
    {
        abbr: '',
        key: 'soccer_korea_kleague1',
    },
    {
        abbr: '',
        key: 'soccer_league_of_ireland',
    },
    {
        abbr: '',
        key: 'soccer_mexico_ligamx',
    },
    {
        abbr: '',
        key: 'soccer_netherlands_eredivisie',
    },
    {
        abbr: '',
        key: 'soccer_norway_eliteserien',
    },
    {
        abbr: '',
        key: 'soccer_poland_ekstraklasa',
    },
    {
        abbr: '',
        key: 'soccer_portugal_primeira_liga',
    },
    {
        abbr: '',
        key: 'soccer_spain_la_liga',
    },
    {
        abbr: '',
        key: 'soccer_spain_segunda_division',
    },
    {
        abbr: '',
        key: 'soccer_spl',
    },
    {
        abbr: '',
        key: 'soccer_sweden_allsvenskan',
    },
    {
        abbr: '',
        key: 'soccer_sweden_superettan',
    },
    {
        abbr: '',
        key: 'soccer_switzerland_superleague',
    },
    {
        abbr: '',
        key: 'soccer_turkey_super_league',
    },
    {
        abbr: '',
        key: 'soccer_uefa_champs_league',
    },
    {
        abbr: '',
        key: 'soccer_uefa_europa_conference_league',
    },
    {
        abbr: '',
        key: 'soccer_uefa_europa_league',
    }
]

export async function getSports(){
    return await fetch(base+sports+markets)
        .then(response => response.json())
        .then(data => {
            const updated_sports = abbrSports(data)
            db.setRecord("sports", updated_sports) 
            return true;
        })
        .catch( e => {
            console.log('error:', e)
            return false;
        })
}

function abbrSports(incoming_sports){
    incoming_sports.forEach(incoming_sport => {
        abbr_sports.forEach((abbr_sport) => {
            if(incoming_sport.key == abbr_sport.key){
                incoming_sport.abbr = abbr_sport.abbr;
            }            
        })
    })
    
    return incoming_sports;
}

export async function getOdds(){
    const sports = await db.getRecord('sports')

    sports.forEach(sport => {
        if(sport.active === true){
            getSportOdds(sport.abbr)
        } else {
            removeSpportOdds(sport.abbr)
        }
        
    })
    

}

export async function getOddsByAbbr(sport_abbr){
    const sport = await db.getObjectFromArray('sports', 'abbr', sport_abbr)
    let url = odds.concat('')
    url.replace(':sport_key', sport.key)

    fetch(base+url+regions)
        .then( data => data.json())
        .then( games => {
            const odds = db.getRecord('odds')
            games.forEach( game => {
                odds.push(game)
            })
            db.setRecord('odds', odds)
        })
}

/*
export async function getOdds(abbr_sport){
    const sport = await db.getObjectFromArray('sports', 'abbr', abbr_sport)
    const url = '' + odds;
    url.replace(':sport_key', sport.key)

    fetch(base+url+regions)
        .then( data => data.json())
        .then( games => {
            const odds = await db.getRecord('odds')
            games.forEach( game => {
                odds.push(game)
            })
            db.setRecord('odds', odds)
        })
}
*/
