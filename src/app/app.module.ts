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

import { BannerComponent } from './component/banner/banner.component';
import { BackTimeComponent } from './component/back-time/back-time.component';

import { RoundComponent } from './component/round/round.component';
import { BackTopComponent } from './component/back-top/back-top.component';
import { RoundDetailComponent } from './pages/round-detail/round-detail.component';
import { ContestDetailHeaderComponent } from './component/contest-detail-header/contest-detail-header.component';
import { ContestDetailHeaderRightComponent } from './component/contest-detail-header-right/contest-detail-header-right.component';

import { LoadingItemComponent } from './component/loading-item/loading-item.component';
import { TypeExamPipe } from './helper/pipe/type-exam.pipe';
import { FormatDatePipe } from './helper/pipe/format-date.pipe';
import { ListAvatarUserComponent } from './component/list-avatar-user/list-avatar-user.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ContestLoadItemComponent } from './loading/contest-load-item/contest-load-item.component';
import { MaterialModule } from './material/material.module';
import { ModalAddTeamComponent } from './component/modal-add-team/modal-add-team.component';
import { ToastComponent } from './component/toast/toast.component';
import { NgToastModule } from 'ng-angular-popup';

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
    RoundComponent,
    BackTopComponent,
    RoundDetailComponent,
    ContestDetailHeaderComponent,
    ContestDetailHeaderRightComponent,
    LoadingItemComponent,
    TypeExamPipe,
    FormatDatePipe,
    ListAvatarUserComponent,
    ContestLoadItemComponent,
    ModalAddTeamComponent,
    ToastComponent,
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
    SlickCarouselModule,
    NgxSkeletonLoaderModule,
    MaterialModule,
    NgToastModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          // { provide: Window, useValue: window },
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
