import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ConfigViewService } from 'src/app/services/config-view.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socialUser!: SocialUser;
  c?: boolean = true;
  statusLogin: string = '';
  alert = {
    type: 'danger',
    message: "",
    display: false,
  }

  constructor(
    private socialAuthService: SocialAuthService,
    private userService: UserService,
    private router: Router,
    private configView: ConfigViewService
  ) { }

  ngOnInit(): void {

  }


  loginWithGoogle(): void {

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(data => {
        this.configView.createToast('success');
        this.userService.login(data.authToken)
          .subscribe(status => {

            if (status == true) {
              this.statusLogin = 'done';


              setTimeout(() => {
                this.router.navigate(['/']);
              }, 1000)
            } else {

            }
          })
      })
  }


  logOut(): void {
    this.socialAuthService.signOut();
  }


}
