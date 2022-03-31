import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContestComponent } from './pages/contest/contest.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ContestDeatailComponent } from './pages/contest-deatail/contest-deatail.component';
import { RoundDetailComponent } from './pages/round-detail/round-detail.component';

const routes: Routes = [
  {
    path: "",
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'cuoc-thi',
        component: ContestComponent,
      },
      {
        path: "chi-tiet-cuoc-thi",
        component: ContestDeatailComponent,
      },
      {
        path: "vong-thi",
        component: RoundDetailComponent,
      }
    ]
  },
  {
    path: "cuoc-thi",
    component: ContestComponent
  },
  {
    path: "login",
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
