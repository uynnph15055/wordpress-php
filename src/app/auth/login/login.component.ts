import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ConfigViewService } from 'src/app/services/config-view.service';
import { UserService } from 'src/app/services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socialUser!: SocialUser;
  c?: boolean = true;
  statusLogin: boolean = false;
  alert = {
    type: 'danger',
    message: "",
  }

  constructor(
    private socialAuthService: SocialAuthService,
    private userService: UserService,
    private router: Router,
    private configView: ConfigViewService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.toast.error({ summary: 'Không thể đăng nhập !', duration: 5000 });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(data => {
        this.statusLogin = true;
        this.toast.warning({ summary: 'Đang tiến hành đăng nhập', duration: 10000 });
        this.configView.createToast('success');
        this.userService.login(data.authToken)
          .subscribe(status => {

            if (status == true) {
              this.statusLogin = false;
              setTimeout(() => {
                this.toast.success({ summary: 'Đăng nhập thành công', duration: 5000 });
                this.router.navigate(['/']);
              }, 1000)
            } else {
              this.toast.error({ summary: 'Không thể đăng nhập', duration: 5000 });
            }
          })
      })
  }


  logOut(): void {
    this.socialAuthService.signOut();
  }


}
