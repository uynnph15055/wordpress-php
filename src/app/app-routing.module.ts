import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContestComponent } from './pages/contest/contest.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ContestDeatailComponent } from './pages/contest-detail/contest-deatail.component';
import { RoundDetailComponent } from './pages/round-detail/round-detail.component';
import { ListAvatarUserComponent } from './component/list-avatar-user/list-avatar-user.component';

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
        path: 'cuoc-thi/chuyen-nganh/:slug',
        component: ContestComponent,
      },
      {
        path: "cuoc-thi/chi-tiet/:slug",
        component: ContestDeatailComponent,
      },
      {
        path: "vong-thi/:id",
        component: RoundDetailComponent,
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "avatar",
    component: ListAvatarUserComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
