import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigFunctionService {

  constructor() { }

  // Chỉ ra index các cột
  indexTable(result_id: number, arr: Array<any>, page: number, countItem: number): number {
    let rank: number = 0;


    arr.forEach((item, index) => {
      if (item.id == result_id)
        rank = index;
    })

    return page == 1 || page == 0 && countItem == 0 ? rank + 1 : rank = (countItem * (page - 1)) + (rank + 1);
  }
}
