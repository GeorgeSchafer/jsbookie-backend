
class User {

  
  static constructor(){
    this.user_id = 0;
  }
  
  constructor( name ){
    this.constructor();
    this.balance = {
      deposit: 0,
      winnings: 0
    };
    this.user_id++;
    this.name = name;
    this.bet_count = 0;
  }

  purchase(){
    
    
    this.bet_count++;

  }

}

class Bet {
  constructor(game_id, purchaser){
    this.price = 0.00;
    this.odds = 0.00;
    this.game_id = game_id;
    this.home_team = true;
    this.eventDate = '';
    this.purchaser = purchaser;
  }
}

export {Bet, User};