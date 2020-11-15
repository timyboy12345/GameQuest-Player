import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PlayerComponent} from "./player/player.component";
import {ControllerComponent} from "./controller/controller.component";
import {QueueComponent} from "./controller/queue/queue.component";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import { StartingComponent } from './controller/starting/starting.component';
import { PlayingComponent } from './controller/playing/playing.component';
import { EndingComponent } from './controller/ending/ending.component';
import { ErrorComponent } from './controller/error/error.component';
import { QuestionComponent } from './player/question/question.component';
import { JoinComponent } from './player/join/join.component';
import { EndComponent } from './player/end/end.component';
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: "player",
    component: PlayerComponent
  },
  {
    path: "controller",
    component: ControllerComponent
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "player"
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
    EndComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxQRCodeModule,
        ReactiveFormsModule
    ],
  exports: [
    RouterModule
  ]
})
export class BardsModule { }
