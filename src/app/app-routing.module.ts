import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "bards",
    loadChildren: () => import('./bards/bards.module').then(m => m.BardsModule)
  },
  {
    path: "**",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
