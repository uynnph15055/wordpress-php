import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  public imagePath: string;
  imgURL: any = 'https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png';
  constructor() { }

  ngOnInit(): void {
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
    console.log(this.imagePath);

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

}
