import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/app/models/sponsor';
import { User } from 'src/app/models/user';
import { SponsorService } from 'src/app/services/sponsor.service';
import { UserService } from 'src/app/services/user.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: Array<User>;
  loggedInUser: User;
  sponsors: Array<Sponsor>;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(
    private userService: UserService,
    private sponsorService: SponsorService,
    iconLib: FaIconLibrary
  ) {
    this.loggedInUser = this.userService.getUserValue();
    this.library.addIconPacks(fas, fab);
  }

  ngOnInit(): void {
    // this.userService.listUser().subscribe(resp => {
    //   console.log(resp);
    // });
    // this.spnsorService.list().subscribe(resp => {
    //   console.log(resp);
    // });
  }
  
  checkLogin(): boolean {
    return this.loggedInUser.id !== undefined
  }

  logout(): void {
    this.userService.logout();
  }

}
