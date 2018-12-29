import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GameModule } from './game/game.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { GameComponent } from './game/game/game.component';

import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'new',
        component: GameComponent
    },
    {
        path: 'continue',
        component: GameComponent,
        data: {continue: true}
    },
    {
        path: '',
        redirectTo: '/index', 
        pathMatch: 'full'
    }
];


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    GameModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
