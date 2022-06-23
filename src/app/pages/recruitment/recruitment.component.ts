import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {

  constructor() { }

  sliderRecruitment = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: '.slick-next', nextArrow: '.slick-prev',
    dots: true,
    autoplay: true,
  };

  // Config doanh nghiệp
  sliderCompany = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    prevArrow: '.slick-company-next', nextArrow: '.slick-company-prev',
    dots: true
  };


  ngOnInit(): void {
  }

}
