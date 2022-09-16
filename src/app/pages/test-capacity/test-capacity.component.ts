import { Component, OnInit } from '@angular/core';
import { Capacity } from 'src/app/models/capacity';
import { TestCapacityService } from 'src/app/services/test-capacity.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-capacity',
  templateUrl: './test-capacity.component.html',
  styleUrls: ['./test-capacity.component.css']
})
export class TestCapacityComponent implements OnInit {
  validateForm!: FormGroup; 
  listCapacity: Capacity[]
   valueSearch: string;
  // fakeTag: any = [
  //   {id: 1, name: "Javascript"},
  // ]

  constructor(
    private testCapacityService: TestCapacityService,
    private fb: FormBuilder
  ) {
    this.getListTestCapacity()
   }

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
