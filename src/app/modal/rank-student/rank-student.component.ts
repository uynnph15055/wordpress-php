import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rank-student',
  templateUrl: './rank-student.component.html',
  styleUrls: ['./rank-student.component.css']
})
export class RankStudentComponent implements OnInit {
  constructor( @Inject(MAT_DIALOG_DATA) public data: { }) { }
  img: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2jAkN5EnVRUzYNrbV6jRg_D3O7lHP1CbWFQ&usqp=CAU';

  ngOnInit(): void {
  }

}
