import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-capacity-exam',
  templateUrl: './capacity-exam.component.html',
  styleUrls: ['./capacity-exam.component.css']
})
export class CapacityExamComponent implements OnInit {

  @ViewChildren("questions") questions: QueryList<ElementRef>;
  formAnswers!: FormGroup;
  fakeQuestionData: any = [
    {
      id: 17,
      created_at: "1 tuần trước",
      updated_at: "1 tuần trước",
      content: "<p>Thông thường tiêu chuẩn Internet cho việc đặt tên trang chủ, hay trang đầu tiên mà người dùng truy&nbsp; cập vào website sẽ là</p>",
      status: 1,
      deleted_at: null,
      type: 0,
      rank: 0,
      pivot: {
        exam_id: 2,
        question_id: 17
      },
      answers: [
        {
          id: 93,
          created_at: "2022-06-15T09:27:43.000000Z",
          updated_at: "2022-06-15T09:27:43.000000Z",
          question_id: 17,
          deleted_at: null,
          content: "Bất kì tên nào",
          is_correct: 0
        },
        {
          id: 94,
          created_at: "2022-06-15T09:27:44.000000Z",
          updated_at: "2022-06-15T09:27:44.000000Z",
          question_id: 17,
          deleted_at: null,
          content: "index.html",
          is_correct: 0
        },
        {
          id: 95,
          created_at: "2022-06-15T09:27:44.000000Z",
          updated_at: "2022-06-15T09:27:44.000000Z",
          question_id: 17,
          deleted_at: null,
          content: "home.html",
          is_correct: 1
        },
        {
          id: 96,
          created_at: "2022-06-15T09:27:44.000000Z",
          updated_at: "2022-06-15T09:27:44.000000Z",
          question_id: 17,
          deleted_at: null,
          content: "default.html",
          is_correct: 0
        }
      ]
    },
    {
      id: 18,
      created_at: "1 tuần trước",
      updated_at: "1 tuần trước",
      content: "<p>Giao thức nào là giao thức truyền tải siêu văn bản được dùng giữa Web client và Web server</p>",
      status: 1,
      deleted_at: null,
      type: 0,
      rank: 0,
      pivot: {
        exam_id: 2,
        question_id: 18
      },
      answers: [
        {
          id: 97,
          created_at: "2022-06-15T09:28:25.000000Z",
          updated_at: "2022-06-15T09:28:25.000000Z",
          question_id: 18,
          deleted_at: null,
          content: "WWW",
          is_correct: 0
        },
        {
          id: 98,
          created_at: "2022-06-15T09:28:25.000000Z",
          updated_at: "2022-06-15T09:28:25.000000Z",
          question_id: 18,
          deleted_at: null,
          content: "HTTP",
          is_correct: 1
        },
        {
          id: 99,
          created_at: "2022-06-15T09:28:25.000000Z",
          updated_at: "2022-06-15T09:28:25.000000Z",
          question_id: 18,
          deleted_at: null,
          content: "FTP",
          is_correct: 0
        },
        {
          id: 100,
          created_at: "2022-06-15T09:28:25.000000Z",
          updated_at: "2022-06-15T09:28:25.000000Z",
          question_id: 18,
          deleted_at: null,
          content: "TCP/IP",
          is_correct: 0
        }
      ]
    },
    {
      id: 19,
      created_at: "1 tuần trước",
      updated_at: "1 tuần trước",
      content: "<p>Mã mầu trong các trang HTML gồm 6 kí tự và đứng trước là dấu thăng (#) sử dụng hệ cơ số nào?</p>",
      status: 1,
      deleted_at: null,
      type: 0,
      rank: 0,
      pivot: {
        exam_id: 2,
        question_id: 19
      },
      answers: [
        {
          id: 101,
          created_at: "2022-06-15T09:28:52.000000Z",
          updated_at: "2022-06-15T09:28:52.000000Z",
          question_id: 19,
          deleted_at: null,
          content: "Hệ nhị phân",
          is_correct: 0
        },
        {
          id: 102,
          created_at: "2022-06-15T09:28:52.000000Z",
          updated_at: "2022-06-15T09:28:52.000000Z",
          question_id: 19,
          deleted_at: null,
          content: "Hệ thập lục phân (Hecxa)",
          is_correct: 1
        },
        {
          id: 103,
          created_at: "2022-06-15T09:28:52.000000Z",
          updated_at: "2022-06-15T09:28:52.000000Z",
          question_id: 19,
          deleted_at: null,
          content: "Hệ thập phân",
          is_correct: 0
        },
        {
          id: 104,
          created_at: "2022-06-15T09:28:52.000000Z",
          updated_at: "2022-06-15T09:28:52.000000Z",
          question_id: 19,
          deleted_at: null,
          content: "Hệ BCD nén",
          is_correct: 0
        }
      ]
    }
  ];
  // DS id câu hỏi đã trả lời
  questionListId: { questionId: number }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.createFormControl();
  }

  // nộp bài
  handleSubmitExam() {
    // check làm thiếu câu hỏi
    if (this.formAnswers.valid) {
      const answerFormData = this.formAnswers.value;
  
      // danh sách id câu hỏi và câu trả lời
      const answersData: {questionId: number, answerId: number}[] = [];
      for (const key in answerFormData) {
        const questionId = key.split("-")[2];
        
        answersData.push({
          questionId: +questionId,
          answerId: answerFormData[key]
        })
      }
      console.log(answersData)
    } else {
      const listQuesNum = this.getFormValidationErrors();
      console.log(`Bạn còn những câu sau chưa làm: ${listQuesNum.join(", ")}`)
    }
  }

  createFormControl() {
    const ctrls: { [name: string ]: FormControl } = {};
    this.fakeQuestionData.forEach((question: any, index: number) => {
      const fieldName = `question-${++index}-${question.id}`;
      ctrls[fieldName] = new FormControl('', Validators.required)
    })

    this.formAnswers = new FormGroup(ctrls);
  }

  // lấy danh sách câu hỏi chưa trả lời
  getFormValidationErrors() {
    const listQuestionNum: number[] = [];
    Object.keys(this.formAnswers.controls).forEach(key => {
      const controlErrors: any = this.formAnswers.get(key)?.errors;

      if (controlErrors != null) {
        const questionNum = key.split("-")[1];
        listQuestionNum.push(+questionNum);
      }
    });

    return listQuestionNum;
  }

  // lưu các câu hỏi đã trả lời
  handleChooseAnswer(questionId: number) {
    const exitsId = this.questionListId.some(item => item.questionId === questionId);
    
    // nếu trong chưa có questionId
    if (!exitsId) {
      this.questionListId.push({
        questionId
      });
    }
  }

  // check câu hỏi đã làm
  checkQuesAnswered(questionId: number) {
    const isAnswerd = this.questionListId.some(item => item.questionId === questionId);

    return isAnswerd;
  }

  // scroll khi click câu hỏi
  scrollToQuestion(indexQuestion: number) {
    this.questions.forEach((questionRef, index) => {
      if (indexQuestion === index) {
        questionRef.nativeElement.scrollIntoView();
      }
    })
  }

}
