import { Component } from '@angular/core';
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
// import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  weixin = ['fab', 'weixin'];
  phone = ['fas', 'phone'];
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  banner: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 10,
    responsive: {
      300: {
        items: 1
      },
      576: {
        items: 1
      },
      978: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
    nav: true
  }
}

