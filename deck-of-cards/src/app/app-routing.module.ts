import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardGameComponent } from './components/card-game/card-game.component';


const routes: Routes = [
  {
    path: 'card-game',
    component: CardGameComponent
  }
  ,
  {
    path: '',
    redirectTo: 'card-game',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
