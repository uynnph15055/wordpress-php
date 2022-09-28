import { SkillServiceService } from 'src/app/services/skill-service.service';
import { ConfigFunctionService } from 'src/app/services/config-function.service';
import { MajorService } from 'src/app/services/major.service';
import { ListPostService } from 'src/app/services/list-post.service';
import { CompanyService } from 'src/app/services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Capacity } from 'src/app/models/capacity';
import { TestCapacityService } from 'src/app/services/test-capacity.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Major } from 'src/app/models/major';
import { Skill } from 'src/app/models/skill.models';
import { Post } from 'src/app/models/post.model';
import { TransmitToPost } from 'src/app/models/transmit-to-post.models';
import { PayingLinks } from 'src/app/models/paying-links';
import { RecruitmentsService } from 'src/app/services/recruitments.service';
import { Recruitments } from 'src/app/models/recruitments.models';
import { Enterprise } from 'src/app/models/enterprise.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-capacity',
  templateUrl: './test-capacity.component.html',
  styleUrls: ['./test-capacity.component.css']
})
export class TestCapacityComponent implements OnInit {
  keywordTrending: any
  validateForm!: FormGroup; 
  listCapacity: Array<Capacity>;
  valueSearch: string | null;
  skills: Array<Skill>;
  skill_id: number = 0;
  companys: Array<Enterprise>;
  cinfigData: TransmitToPost;
  majors: Array<Major>;

  statusNotResultReturn: boolean = false;
  statusCapacity: boolean = false;
  statusKeywordTrending: boolean = false;
  

  constructor(
    private testCapacityService: TestCapacityService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public companyService: CompanyService,
    public recruitmentService: RecruitmentsService,
    public listPostService: ListPostService,
    public majorService: MajorService,
    public configService: ConfigFunctionService,
    public skillService: SkillServiceService
  ) {
   }

   statusFilter: Array<any> = [
    {
      prams: true,
      name: 'Đã vào Vòng Thi',
    },
    {
      prams: false,
      name: 'Chưa vào Vòng Thi',
    },
  ];

  formFilter = new FormGroup({
    filterSkill: new FormControl(''),
    filterName: new FormControl(''),
    filterMajor: new FormControl(''),
    filterStatus: new FormControl(''),
  });

  ngOnInit(): void {
    this.getListKeywordTrending()
    this.getListMajor();
    this.getAllSkill();
    this.valueSearch = this.route.snapshot.queryParamMap.get('q')
    let major_id= this.route.snapshot.queryParamMap.get('major_id')
    let skill_id = this.route.snapshot.queryParamMap.get('skill_id')
    
    if(this.valueSearch != null || major_id != null || skill_id != null){
      this.listCapacity = []
      this.statusCapacity = false
      this.testCapacityService
      .filterCapacity(this.valueSearch, major_id,  skill_id)
      .subscribe((res) => {
        if (res.status) {
          if(res.payload.data.length <= 0 ){
            this.statusCapacity = true
            this.statusNotResultReturn = true
          }else{
            this.listCapacity = res.payload.data;
            this.statusCapacity = true;
            this.scrollWin();
          }
        }
      });
    }else{
      this.getListTestCapacity()
    }
  }

  getListTestCapacity(){
    this.testCapacityService.getAllTestCapacity().subscribe(res=>{
        if (res.status) {
          this.listCapacity = res.payload.data;
          this.listCapacity
            ? (this.statusCapacity = true)
            : this.statusCapacity;
            this.scrollWin();
        }
    })
  }

  getListKeywordTrending(){
    this.testCapacityService.getAllKeywordTrendingCapacity().subscribe(res=>{
        if (res.status) {
          let arrResult= res.payload;
          // Chỉ lấy ra 5 phần tử đầu tiên trong mảng
          this.keywordTrending = arrResult.filter((res: any , index: number) => {
            return index <= 4;
          });
          this.keywordTrending
            ? (this.statusKeywordTrending = true)
            : this.statusKeywordTrending;
        }
    })
  }
  
  // Set filter value
  setValueFilterMajor(item: Major) {
    this.formFilter.controls['filterMajor'].setValue(item.name);
  }

  // Set filter status
  setValueSkill(skill: Skill) {
    this.formFilter.controls['filterSkill'].setValue(skill.name);
  }

  // Set keyword 
  setValueKeyword(event: any) {
    this.formFilter.controls['filterName'].setValue(event.target.value);
  }

  // Set keywordTrending to input search when click  
  setValueKeywordTrending(keyword: string) {
    this.formFilter.controls['filterName'].setValue(keyword);
  }

  // Fillter 
  filterSelect(arr: Array<any>, value: string, input: string) {
    switch (input) {
      case 'major':
        if (!value) {
          this.getListMajor();
        } else {
          this.majors = arr.filter((item) => {
            return this.configService
              .changeString(item.name)
              .includes(this.configService.changeString(value));
          });
        }
        break;
      case 'skill':
        if (!value) {
          this.getAllSkill()
        } else {
          this.skills = arr.filter((item) => {
            return this.configService
              .changeString(item.name)
              .includes(this.configService.changeString(value));
          });
        }
        break;

      default:
        break;
    }
  }

  


  getListMajor() {
    this.majorService.getAll().subscribe((res) => {
      if (res.status) {
        this.majors = res.payload;
      }
    });
  }

  // ScrollWin
  scrollWin() {
    window.scrollTo({ top: 500, behavior: 'smooth'  });
  }


  // Filter Capacity
  filterCapacity() {
    this.listCapacity = []
    this.statusNotResultReturn = false
    this.statusCapacity = false
    let major_id = 0;
    let keyword = '';
  
    if (this.formFilter.controls['filterName'].value) {
      keyword = this.formFilter.controls['filterName'].value;
    }

    if (this.formFilter.controls['filterMajor'].value) {
      major_id = this.majors.filter(
        (item) => item.name === this.formFilter.controls['filterMajor'].value
      )[0].id;
    }

    if (this.formFilter.controls['filterSkill'].value) {
      this.skill_id = this.skills.filter(
        (item) => item.name === this.formFilter.controls['filterSkill'].value
      )[0].id;
    }
    

    // đẩy param search lên URL
    this.router.navigateByUrl(`test-nang-luc?q=${keyword}&major_id=${major_id}&skill_id=${this.skill_id}`);
   
    this.testCapacityService
      .filterCapacity(keyword, major_id,  this.skill_id)
      .subscribe((res) => {
        if (res.status) {
          if(res.payload.data.length <= 0 ){
            this.statusCapacity = true
            this.statusNotResultReturn = true
          }else{
            this.listCapacity = res.payload.data;
            this.statusCapacity = true;
            this.statusNotResultReturn = false
            this.scrollWin();
          }
        }
      });
  }


  // // Get all skill
  getAllSkill() {
    this.skillService.getAll().subscribe((res) => {
      if (res.status) {
        this.skills = res.payload;
      }
    });
  }


}
