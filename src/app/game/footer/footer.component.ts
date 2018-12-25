import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _stateService:StateService;
    
  constructor(stateService:StateService) {
    this._stateService = stateService;
  }
  
  ngOnInit() {
  }
  
   _resetGame(){
    console.log("Reseting game!!");
    this._stateService.reset();
  }

}
