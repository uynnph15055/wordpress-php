import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socialUser!: SocialUser;
  isLoggedin?: boolean = true;
  alert = {
    type: 'danger',
    message: "sdfsd",
    display: true
  }

  constructor(
    private socialAuthService: SocialAuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(data => {
        this.userService.login(data.authToken)
          .subscribe(status => {
            this.isLoggedin = status
            if (status == true) {
              this.alert = {
                type: 'success',
                message: "Đăng nhập thành công!",
                display: true
              }

              setTimeout(() => {
                this.router.navigate(['/']);
              }, 1000)
            } else {
              this.alert = {
                type: 'danger',
                message: "Đăng nhập thất bại, vui lòng sử dụng tài khoản khác!",
                display: true
              }
            }
          })
      })
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }


}
