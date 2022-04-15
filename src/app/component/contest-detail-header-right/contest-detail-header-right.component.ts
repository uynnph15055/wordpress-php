import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment/moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-contest-detail-header-right',
  templateUrl: './contest-detail-header-right.component.html',
  styleUrls: ['./contest-detail-header-right.component.css']
})
export class ContestDetailHeaderRightComponent implements OnInit {
  @Input() contestDetail: any;
  @Input() status: any;
  closeResult: string;
  roundEndTime: any;
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


  days: number = 5;
  hours: number = 16;
  minutes: number = 20;
  seconds: number = 25;

  constructor(private modalService: NgbModal, private teamService: TeamService) { }

  ngOnInit(): void {

    this.roundEndTime = moment(this.contestDetail.register_deadline).format('lll');
  }

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
    formDataTeam.append('contest_id', this.contestDetail.id);
    formDataTeam.append('user_id', this.user_id);

    this.teamService.addTeam(formDataTeam).subscribe(res => {
      console.log(res);
    })
  }


  x = setInterval(() => {
    let futureDate = new Date(this.roundEndTime).getTime();
    let today = new Date().getTime();
    let distance = futureDate - today;
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }, 1000);

  // Hàm open model dang ký 
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
