import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-capacity-detail',
  templateUrl: './capacity-detail.component.html',
  styleUrls: ['./capacity-detail.component.css']
})
export class CapacityDetailComponent implements OnInit {

  tabActive!: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModalDesc(content: Object) {
    this.modalService.open(content, { scrollable: true })
  }

  scrollToElement(el: HTMLElement, activeItem: string) {
    this.tabActive = activeItem;

    let offsetTop = el.offsetTop;
    if (activeItem === 'testRelated') {
      offsetTop -= 150;
    }

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }

}
