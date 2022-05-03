import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContestComponent } from './pages/contest/contest.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ContestDeatailComponent } from './pages/contest-detail/contest-deatail.component';
import { ListAvatarUserComponent } from './component/list-avatar-user/list-avatar-user.component';
import { ContestLoadItemComponent } from './loading/contest-load-item/contest-load-item.component';
import { InfoTeamComponent } from './pages/info-team/info-team.component';
import { ProfileUserComponent } from './component/profile-user/profile-user.component';
import { ContestUserJoinComponent } from './component/contest-user-join/contest-user-join.component';
import { TeamUserJoinComponent } from './component/team-user-join/team-user-join.component';
import { TeamUserJoinDetailComponent } from './component/team-user-join-detail/team-user-join-detail.component';
import { RoundDetailComponent } from './component/round-detail/round-detail.component';
import { RoundComponent } from './component/round/round.component';

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
        path: 'thong-tin',
        component: InfoTeamComponent,
        children: [
          {
            path: 'ca-nhan',
            component: ProfileUserComponent,
          },
          {
            path: 'cuoc-thi-tham-gia',
            component: ContestUserJoinComponent,
          },
          {
            path: 'cac-doi',
            component: TeamUserJoinComponent,
          }
          ,
          {
            path: 'chi-tiet-doi/:team_id',
            component: TeamUserJoinDetailComponent,
          }
        ]
      },
      {
        path: 'cuoc-thi/chuyen-nganh/:slug',
        component: ContestComponent,
      },
      {
        path: 'cuoc-thi/trang-thai/:status',
        component: ContestComponent,
      },
      {
        path: "cuoc-thi/chi-tiet/:id",
        component: ContestDeatailComponent,
        children: [
          {
            path: "cuoc-thi/chi-tiet/:id",
            component: RoundComponent,
          },
          {
            path: "cuoc-thi/chi-tiet/vong/:id",
            component: RoundDetailComponent
          }
        ]
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "test",
    component: ContestLoadItemComponent
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
