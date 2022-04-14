import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment/moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';
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


  // set up form control
  formRegister = new FormGroup({
    nameTeam: new FormControl('', Validators.required),
  })


  days: number = 5;
  hours: number = 16;
  minutes: number = 20;
  seconds: number = 25;

  constructor(private modalService: NgbModal, private teamService: TeamService) { }
  public imagePath: string;
  imgURL: any = 'https://pic.onlinewebfonts.com/svg/img_550783.png';
  public message: string;
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
    this.imagePath = files;

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  // Add team

  addTeam() {
    let data = {
      name: '',
      files: {},
      contest_id: 0,
    }
    let dataTeam = { ...this.formRegister.value }
    data.name = dataTeam.nameTeam;
    data.files = this.imagePath[0];
    data.contest_id = this.contestDetail.id;

    console.log(data);

    // this.teamService.addTeam(data).subscribe(res => {
    //   alert('Thêm thành công !!!');
    // })
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
