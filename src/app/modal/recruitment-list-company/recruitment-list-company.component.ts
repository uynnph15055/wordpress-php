import { Component, Inject, OnInit } from '@angular/core';
import { RecruitmentComponent } from './../recruitment/recruitment.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecruitmentsService } from 'src/app/services/recruitments.service';
import { Recruitments } from 'src/app/models/recruitments.models';
import { Enterprise } from 'src/app/models/enterprise.model';
@Component({
  selector: 'app-recruitment-list-company',
  templateUrl: './recruitment-list-company.component.html',
  styleUrls: ['./recruitment-list-company.component.css']
})
export class RecruitmentListCompanyComponent implements OnInit {
  rescruitment_id: number;
  rescruitmentDetail: Recruitments;
  rescruitmentComanySupport: Array<Enterprise>;
  companyLength: number;

  statusRescruitmentDetail: boolean = false;

  constructor(
    public recruitment: RecruitmentsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RecruitmentListCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rescruitment_id: number },) {
    this.rescruitment_id = data.rescruitment_id;
  }

  ngOnInit(): void {
    this.getCompanyWhereRecruitDetail(this.rescruitment_id);
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  // Mở modal bài test theo doanh nghiệp
  openRecruitmentDetail(): void {
    this.closeDialog();
    this.dialog.open(RecruitmentComponent, {
    })
  }

  // Danh sách các daonh nghiệp tham gia đợt tuyển dụng.
  getCompanyWhereRecruitDetail(recruitment_id: number) {
    this.recruitment.getRecruitmentDetail(recruitment_id).subscribe(res => {
      if (res.status) {
        this.rescruitmentDetail = res.payload;
        this.rescruitmentComanySupport = this.rescruitmentDetail.enterprise;
        this.companyLength = this.rescruitmentComanySupport.length;
        console.log(this.rescruitmentComanySupport);

      }
    })
  }

}
