import { Component, Input, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/slider.model';
import { SliderService } from 'src/app/services/slider.service';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  banner: Array<Slider> = [];
  bannerStatus: string = 'pending';
  @Input() bannerSub: Array<any>;
  constructor(private sliderService: SliderService) {
  }

  ngOnInit(): void {
    if (this.bannerSub.length > 0) {
      this.banner = this.bannerSub;
      this.bannerStatus = 'done';
    } else {
      this.sliderService.getListSlider('home', '', '').subscribe(res => {
        if (res.status == true) {
          this.banner = res.payload;
          if (this.banner) {
            setTimeout(() => {
              this.bannerStatus = 'done';
            }, 1000);
          }

        }
      });
    }


  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
