import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socialUser!: SocialUser;
  isLoggedin?: boolean = false;

  constructor(
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {

  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(data => {
      console.log(data);
    })
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }

}
