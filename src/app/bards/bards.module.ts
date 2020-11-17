import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { ControllerComponent } from './controller/controller.component';
import { QueueComponent } from './controller/queue/queue.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { StartingComponent } from './controller/starting/starting.component';
import { PlayingComponent } from './controller/playing/playing.component';
import { EndingComponent } from './controller/ending/ending.component';
import { ErrorComponent } from './controller/error/error.component';
import { QuestionComponent } from './player/question/question.component';
import { JoinComponent } from './player/join/join.component';
import { EndComponent } from './player/end/end.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JoinedComponent } from './player/joined/joined.component';
import { FinishedComponent } from './controller/finished/finished.component';
import { _componentsModule } from '../_components/_components.module';
import { LoadingComponent } from './player/loading/loading.component';
import { CachedGameComponent } from './player/cached-game/cached-game.component';

const routes: Routes = [
  {
    path: 'player',
    component: PlayerComponent
  },
  {
    path: 'controller/:game_id',
    component: ControllerComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'player'
  }
];

@NgModule({
  declarations: [
    PlayerComponent,
    ControllerComponent,
    QueueComponent,
    QueueComponent,
    StartingComponent,
    PlayingComponent,
    EndingComponent,
    ErrorComponent,
    QuestionComponent,
    JoinComponent,
    EndComponent,
    JoinedComponent,
    FinishedComponent,
    LoadingComponent,
    CachedGameComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule,
    ReactiveFormsModule,
    _componentsModule,
  ],
  exports: [
    RouterModule
  ]
})
export class BardsModule {
}
