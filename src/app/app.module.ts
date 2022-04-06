import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ContestComponent } from './pages/contest/contest.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ContestDeatailComponent } from './pages/contest-detail/contest-deatail.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BannerComponent } from './component/banner/banner.component';
import { BackTimeComponent } from './component/back-time/back-time.component';
import { TeamExamComponent } from './component/team-exam/team-exam.component';

import { RoundComponent } from './component/round/round.component';
import { BackTopComponent } from './component/back-top/back-top.component';
import { RoundDetailComponent } from './pages/round-detail/round-detail.component';
import { ContestDetailHeaderComponent } from './component/contest-detail-header/contest-detail-header.component';
import { ContestDetailHeaderRightComponent } from './component/contest-detail-header-right/contest-detail-header-right.component';

import { LoadingItemComponent } from './component/loading-item/loading-item.component';
import { TypeExamPipe } from './helper/pipe/type-exam.pipe';
import { FormatDatePipe } from './helper/pipe/format-date.pipe';
import { ListAvatarUserComponent } from './component/list-avatar-user/list-avatar-user.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ContestComponent,
    HomeLayoutComponent,
    ContestDeatailComponent,
    BannerComponent,
    BackTimeComponent,
    TeamExamComponent,
    RoundComponent,
    BackTopComponent,
    RoundDetailComponent,
    ContestDetailHeaderComponent,
    ContestDetailHeaderRightComponent,
    LoadingItemComponent,
    TypeExamPipe,
    FormatDatePipe,
    ListAvatarUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          { provide: Window, useValue: window },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GG_CLIENT_ID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
