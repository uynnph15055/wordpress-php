import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  public imagePath: string;
  statusEditUser: boolean = false;
  userInfo: User;
  nameUser: string;


  imgURL: any = 'https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png';
  constructor(private userService: UserService,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.userInfo = this.userService.getUserValue();
    this.imgURL = this.userInfo.avatar;
  }

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    this.imagePath = files[0];

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  EditInFoUser() {
    this.statusEditUser = true;

    let formDataUser = new FormData();
    if (this.imagePath == undefined) {
      this.imagePath = this.userInfo.avatar;
    }

    if (this.nameUser == undefined) {
      this.nameUser = this.userInfo.name;
    }

    formDataUser.append('name', this.nameUser);
    formDataUser.append('avatar', this.imagePath);
    this.userService.editInfoUser(formDataUser).subscribe(res => {
      if (res.status) {
        this.statusEditUser = false;
        this.toast.success({ summary: 'Sửa thành công !!!', duration: 2000 });
        this.userService.setLocalStorageHasEdit(res.payload);
      } else {
        if (res.payload.name) {
          this.toast.warning({ summary: res.payload.name, duration: 2000 });
          this.statusEditUser = false;
        } else if (res.payload.avatar) {
          this.toast.warning({ summary: res.payload.avatar, duration: 2000 });
          this.statusEditUser = false;
        }
      }
    })
  }

  setNameUser(event: any) {
    this.nameUser = event.target.value;
    console.log(this.nameUser);

    if (this.nameUser == undefined) {
      this.nameUser = this.userInfo.name;
    }
    if (this.nameUser.length > 30) {
      this.toast.warning({ summary: 'Chú ý độ dài tên !!!', duration: 3000 });
    }
  }
}
