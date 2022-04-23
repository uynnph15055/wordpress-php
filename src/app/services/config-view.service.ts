import { Injectable } from '@angular/core';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class ConfigViewService {

  constructor() { }

  // Chạy thống kê trang chủ
  runStatisticHome(el: any, to: any) {
    let speed = 200
    let from = 0
    let step = to / speed
    const counter = setInterval(function () {
      from += step
      if (from > to) {
        clearInterval(counter)
        el.innerText = to + '+';
      } else {
        el.innerText = Math.ceil(from) + '+'
      }
    }, 5)
  }

  // Hiệu ứng chuyển động
  activityStrollView(elToShow: any) {

    console.log(elToShow);

    function isElInViewPort(el: any) {
      let rect = el.getBoundingClientRect()
      // some browsers support innerHeight, others support documentElement.clientHeight
      let viewHeight = window.innerHeight || document.documentElement.clientHeight

      return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >= viewHeight && rect.top <= viewHeight) ||
        (rect.top >= 0 && rect.bottom <= viewHeight)
      )
    }

    function loop() {
      elToShow.forEach((item: any) => {
        if (isElInViewPort(item)) {
          item.classList.add('start')
        } else {
          item.classList.remove('start')
        }
      })
    }

    window.onscroll = loop

    loop()
  }


  // Event stroll top
  eventStrollTop(): boolean {
    window.addEventListener('scroll', () => {
      return true;
    })
    return false;
  }
}
