import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
    turn: string,
    values: string[][],
    numMovs: number,
    gameOver: boolean,
    player_name: string
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

    private _state$:BehaviorSubject<State>;

  constructor() {
    this._state$ = new BehaviorSubject({
        turn: 'PLAYERX',
        values: [
            ['-','-','-'],
            ['-','-','-'],
            ['-','-','-']
        ],
        numMovs: 0,
        gameOver: false,
        player_name: ''
    });
  }
  
  get state$ (): BehaviorSubject<State> {
    return this._state$;
  }
  
  get state (): State{
    return this._state$.getValue();
  }
  
  set state (state:State){
    this._state$.next(state);
  }
  
  updateValue(row,col){
    if (this.state.values[row][col] === '-'){
        let newValue = this.state.turn === 'PLAYERX'? 'X':'0';
        this.state.values[row][col] = newValue;
        let newTurn = '';
        if (this.checkWinner(row,col,newValue)){
            newTurn = this.state.turn === 'PLAYERX'? 'PLAYERX WINS!!':'PLAYER0 WINS!!';
            this.state.gameOver = true;
        } else{
            newTurn = this.state.turn === 'PLAYERX'? 'PLAYER0':'PLAYERX';
        }
        this.state.turn = newTurn;
        this.state.numMovs = this.state.numMovs + 1;
        console.log("numMovs=" + this.state.numMovs);
        this.state = this.state;
    }
  }
  
  checkWinner(row,col,newValue){
    var tempRow: number=0;
    var tempCol: number=0;
    //Compruebo en horizontal
    tempCol = col+1>2? 0:col+1;
    if (this.state.values[row][tempCol] === newValue){
        tempCol = tempCol+1>2? 0:tempCol+1;
        if (this.state.values[row][tempCol] === newValue){
            return true;
        }
    }
    
    //Compruebo en vertical
    tempRow = row+1>2? 0:row+1;
    if (this.state.values[tempRow][col] === newValue){
        tempRow = tempRow+1>2? 0:tempRow+1;
        if (this.state.values[tempRow][col] === newValue){
            return true;
        }
    }
    
    //Compruebo en diagonal
    if (this.state.values[0][0] === newValue &&
        this.state.values[1][1] === newValue &&
        this.state.values[2][2] === newValue){
        return true;
    }
    if (this.state.values[0][2] === newValue &&
        this.state.values[1][1] === newValue &&
        this.state.values[2][0] === newValue){
        return true;
    }

    return false;
  }
  
  reset(){
    this.state = {
        turn: 'PLAYERX',
        values: [
            ['-','-','-'],
            ['-','-','-'],
            ['-','-','-']
        ],
        numMovs: 0,
        gameOver: false,
        player_name: ''
    };
  }
}
