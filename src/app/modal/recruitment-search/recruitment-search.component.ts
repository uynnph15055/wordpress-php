import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recruitments } from 'src/app/models/recruitments.models';
import { RecruitmentsService } from 'src/app/services/recruitments.service';

@Component({
  selector: 'app-recruitment-search',
  templateUrl: './recruitment-search.component.html',
  styleUrls: ['./recruitment-search.component.css']
})
export class RecruitmentSearchComponent implements OnInit {
  keywordRecr : string;
  recruitments : Array<Recruitments>;
  statusRecruitment : boolean = false;
  statusOpenFormSearch : boolean = false;
  countResultRecruitment: number;

  constructor(
    public recruitmentService: RecruitmentsService,
    public dialogRef: MatDialogRef<RecruitmentSearchComponent>,
    ) { }

  ngOnInit(): void {
  }

  setKeywork(event : any){
    this.keywordRecr =  event.target.value;
  }

  searchRecruitment(){
    this.statusOpenFormSearch = true;
    this.statusRecruitment = false;
    console.log(this.keywordRecr);
    
    this.recruitmentService.searchRecruitment(this.keywordRecr).subscribe(res => {
      if(res.status){
        this.recruitments = res.payload.data;
        if(this.keywordRecr == '')
          this.statusOpenFormSearch = false;
        this.recruitments ? this.statusRecruitment = true : this.statusRecruitment;
        !this.statusOpenFormSearch ? this.countResultRecruitment = 0 : this.countResultRecruitment = this.recruitments.length;
      }
    })
  
  }
}
