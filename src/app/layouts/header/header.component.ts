import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  statusWindow: boolean = false;
  constructor(private userInfo: GetValueLocalService) { }

  ngOnInit(): void {
    this.user = this.userInfo.getValueLocalUser('user');
  }

  closeMenuRes(element: HTMLElement) {
    console.log(element);
    element.removeAttribute("checked");
  }


  // LogOut
  logOut() {
    localStorage.clear();
    this.ngOnInit();
  }
}
