import { CapacityExamHistory } from "./../../models/capacity";
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { QuestionCapacity } from "src/app/models/exam.model";

@Component({
  selector: "app-modal-history-capacity",
  templateUrl: "./modal-history-capacity.component.html",
  styleUrls: ["./modal-history-capacity.component.css"],
})
export class ModalHistoryCapacityComponent implements OnInit {
  @ViewChildren("questions") questionsRef: QueryList<ElementRef>;
  questions!: QuestionCapacity[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: CapacityExamHistory) {}

  ngOnInit(): void {
    const questions = this.data.exam.questions;
    this.questions = questions;

    questions.forEach((item) => {
      const isNotAnswer = !item.result_capacity_detail.length || item.result_capacity_detail.every((v) => !v.answer_id);
      item.isNotAnswer = isNotAnswer;

      item.answers.forEach((answer) => {
        const isChoose = item.result_capacity_detail.some((detail) => detail.answer_id === answer.id);

        answer.isChoose = isChoose;
      });
    });
  }

  // scroll khi click câu hỏi
  scrollToQuestion(indexQuestion: number) {
    this.questionsRef.forEach((questionRef, index) => {
      if (indexQuestion === index) {
        questionRef.nativeElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}
