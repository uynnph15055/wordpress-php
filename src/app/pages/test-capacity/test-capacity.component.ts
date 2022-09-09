import { Component, OnInit } from '@angular/core';
import { Capacity } from 'src/app/models/capacity';
import { TestCapacityService } from 'src/app/services/test-capacity.service';

@Component({
  selector: 'app-test-capacity',
  templateUrl: './test-capacity.component.html',
  styleUrls: ['./test-capacity.component.css']
})
export class TestCapacityComponent implements OnInit {
  listCapacity: Capacity[]
   valueSearch: string;
  // fakeTag: any = [
  //   {id: 1, name: "Javascript"},
  // ]

  constructor(
    private testCapacityService: TestCapacityService
  ) {
    this.getListTestCapacity()
   }

  ngOnInit(): void {
  }

  getListTestCapacity(){
    this.testCapacityService.getAllTestCapacity().subscribe(data=>{
        this.listCapacity = data.payload.data;
    })
  }
  // Tìm kiếm danh sách test năng lực
  searchTestCapacity(){
    this.listCapacity = []
  }

}
