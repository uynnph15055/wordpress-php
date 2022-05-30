import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigFunctionService {

  constructor() { }

  // Chỉ ra index các cột
  indexTable(result_id: number, arr: Array<any>): number {
    let rank: number = 0;
    arr.forEach((item, index) => {
      if (item.id == result_id)
        rank = index;
    })
    return rank + 1;
  }
}
