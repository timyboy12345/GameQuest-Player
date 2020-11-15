import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OauthRedirectComponent} from "./oauth-redirect/oauth-redirect.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "callback",
    component: OauthRedirectComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
