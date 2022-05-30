import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirectionTeamComponent } from '../modal-direction-team/modal-direction-team.component';
import { Team } from 'src/app/models/team';
@Component({
  selector: 'app-modal-add-team',
  templateUrl: './modal-add-team.component.html',
  styleUrls: ['./modal-add-team.component.css']
})
export class ModalAddTeamComponent implements OnInit {
  selectedImage: any;
  statusRegister: boolean;
  titleModel: string = 'Thêm đội tham gia thi'
  public imagePath: string;
  contest_id: any;
  buttonName: string = 'Đăng ký';
  teamDetail = new Team();
  user: User;
  imgURL: any = 'https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png';
  public message: string;
  user_id: any = 4;
  // set up form control
  formRegister = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl(),
    id: new FormControl(),
    user_id: new FormControl(),
  })

  constructor(private teamService: TeamService,
    public dialogRef: MatDialogRef<ModalAddTeamComponent>,
    private getUserLocal: GetValueLocalService,
    private router: ActivatedRoute,
    private toast: NgToastService,
    public dialog: MatDialog,
    config: NgbModalConfig, private modalService: NgbModal,
    @Inject(MAT_DIALOG_DATA) public data: { contest_id: number, team_id: Team }) {
    this.contest_id = data.contest_id;
    if (data.team_id != null) {
      this.teamDetail = { ...data.team_id };
    }
    config.backdrop = 'static';
    config.keyboard = false;

  }

  // --------
  ngOnInit(): void {
    this.user = this.getUserLocal.getValueLocalUser("user");


    if (this.teamDetail.name) {
      this.titleModel = 'Sửa đội thi';
      this.imgURL = this.teamDetail.image;
      this.buttonName = 'Sửa đội';
    }
  }

  // Render image after add
  preview(files: any) {
    console.log(files);

    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files[0];

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  openDialog(idTeamNew: any, contestId: number) {
    const dialogRef = this.dialog.open(ModalDirectionTeamComponent, {
      width: "400px",
      data: { idTeamNew: idTeamNew, contestId: contestId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  // Add team
  addTeam() {
    this.statusRegister = false;
    let dataTeam = { ...this.formRegister.value }
    var formDataTeam = new FormData();

    formDataTeam.append('name', dataTeam.name);
    formDataTeam.append('image', this.imagePath);
    formDataTeam.append('contest_id', this.contest_id);
    formDataTeam.append('user_id', this.user_id);

    this.teamService.addTeam(formDataTeam).subscribe(res => {
      setTimeout(() => {
        if (res.status == false) {
          this.toast.warning({ summary: res.payload, duration: 2000 });
          this.dialogRef.close();
        } else {
          this.statusRegister = true;
          this.dialogRef.close();
          this.openDialog(res.id_team, this.contest_id);
        }
      }, 3000);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
