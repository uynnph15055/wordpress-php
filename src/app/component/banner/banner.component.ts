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
  bannerStatus: string = 'pending'
  constructor(private sliderService: SliderService) {

  }

  ngOnInit(): void {

    this.sliderService.getListSlider().subscribe(res => {
      if (res.status == true) {
        this.banner = res.payload;
        if (this.banner) {
          setTimeout(() => {
            this.bannerStatus = 'done';
          }, 2000);
        }

      }
    })
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
