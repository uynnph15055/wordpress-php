import { Component, OnInit } from '@angular/core';
import { Capacity } from 'src/app/models/capacity';
import { TestCapacityService } from 'src/app/services/test-capacity.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Major } from 'src/app/models/major';
import { Skill } from 'src/app/models/skill.models';
import { Post } from 'src/app/models/post.model';
import { TransmitToPost } from 'src/app/models/transmit-to-post.models';
import { PayingLinks } from 'src/app/models/paying-links';
import { RecruitmentsService } from 'src/app/services/recruitments.service';
import { Recruitments } from 'src/app/models/recruitments.models';
import { Enterprise } from 'src/app/models/enterprise.model';

@Component({
  selector: 'app-test-capacity',
  templateUrl: './test-capacity.component.html',
  styleUrls: ['./test-capacity.component.css']
})
export class TestCapacityComponent implements OnInit {
  validateForm!: FormGroup; 
  listCapacity: Array<Capacity>;
  valueSearch: string;

  companys: Array<Enterprise>;
  recruitments: Array<Recruitments>;
  recruitmentsHot: Array<RecruitmentsService> = [];
  recruitmentLinks: Array<PayingLinks>;
  cinfigData: TransmitToPost;
  listPostResult: Array<Post>;
  majors: Array<Major>;
  skills: Array<Skill>;
  skill_id: number = 0;

  statusCompany: boolean = false;
  statusRecruitments: boolean = false;
  statusRecruitmentsHot: boolean = false;
  

  constructor(
    private testCapacityService: TestCapacityService,
    private fb: FormBuilder
  ) {
    this.getListTestCapacity()
   }

   statusFilter: Array<any> = [
    {
      prams: 'normal',
      name: 'Mới nhất',
    },
    {
      prams: 'hot',
      name: 'Hot nhất',
    },
  ];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      value: [null, [Validators.required]],
    });
  }

  getListTestCapacity(){
    this.testCapacityService.getAllTestCapacity().subscribe(data=>{
        this.listCapacity = data.payload.data;
    })
  }
  // Tìm kiếm danh sách test năng lực
  onSubmit(){
  if (this.validateForm.valid) {
         this.testCapacityService.SearchTestCapacity(this.valueSearch).subscribe(data=>{
           this.listCapacity = data.payload.data;
       })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }    
  }

}
