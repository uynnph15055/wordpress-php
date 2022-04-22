import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GetValueLocalService {

  constructor() { }

  // Gọi dữ liệu user từ localStorage
  getValueLocalUser(nameLocal: string): User {
    let dataString: any;
    dataString = localStorage.getItem(nameLocal);
    return JSON.parse(dataString);
  }
}
