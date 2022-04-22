import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-add-team',
  templateUrl: './modal-add-team.component.html',
  styleUrls: ['./modal-add-team.component.css']
})
export class ModalAddTeamComponent implements OnInit {
  selectedImage: any;
  public imagePath: string;
  imgURL: any = 'https://pic.onlinewebfonts.com/svg/img_550783.png';
  public message: string;
  user_id: any = 4;
  // set up form control
  formRegister = new FormGroup({
    nameTeam: new FormControl('', Validators.required),
    image: new FormControl(),
    contest_id: new FormControl(),
    user_id: new FormControl(),
  })

  constructor(private teamService: TeamService, public dialogRef: MatDialogRef<ModalAddTeamComponent>) { }

  // --------
  ngOnInit(): void {
  }

  // Render image after add
  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
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

  // Add team
  addTeam() {


    let dataTeam = { ...this.formRegister.value }
    var formDataTeam = new FormData();

    formDataTeam.append('name', dataTeam.nameTeam);
    formDataTeam.append('image', this.imagePath);
    formDataTeam.append('contest_id', this.dialogRef.id);
    formDataTeam.append('user_id', this.user_id);

    this.teamService.addTeam(formDataTeam).subscribe(res => {
      console.log(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
