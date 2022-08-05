import { Exam } from "./exam.model";
import { Round } from "./round.model";

export class Capacity {
  id: number;
  name: string;
  img: string;
  date_start: Date;
  register_deadline: Date;
  description: string;
  major_id: number;
  status: number;
  slug_name: string;
  rounds: Round[];
  user_capacity_done: [] // ds user làm bài
  skills: { name: string, short_name: string }[]
}

class ResultExam {
  id: number;
  scores: number;
  updated_at: Date
}

export class ResponseSubmitExam {
  status: boolean;
  payload: ResultExam;
  exam: ResultExam;
  score: number;
  donotAnswer: number; // câu hỏi chưa trả lời
  falseAnswer: number; // số câu trả lời sai
  trueAnswer: number; // số câu trả lời đúng
}

export class DataExam {
  exam_id: number;
  data: {
    questionId: number;
    answerIds?: string[];
    type: number;
    answerId?: number;
  }[]
}

// kết quả check trạng thái làm bài
export class ResponseCheckSttExam {
  status: boolean;
  payload: number;
  message: string;
  result: ResultExam
}