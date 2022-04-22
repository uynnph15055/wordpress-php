import { Injectable } from '@angular/core';

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
}
