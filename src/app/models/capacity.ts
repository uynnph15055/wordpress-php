import { ExamCapacity } from "./exam.model";
import { CapacityRound, Round } from "./round.model";

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
  start_register_time: Date
  rounds: Round[];
  user_capacity_done: []; // ds user làm bài
  skills: { name: string; short_name: string }[];
}

class ResultExam {
  id: number;
  scores: number;
  donot_answer: number;
  false_answer: number;
  true_answer: number;
  created_at: Date;
  updated_at: Date;
}

export class ResponseSubmitExam {
  status: boolean;
  payload: ResultExam;
}

export class DataExam {
  exam_id: number;
  data: {
    questionId: number;
    answerIds?: string[];
    type: number;
    answerId?: number;
  }[];
}

// kết quả check trạng thái làm bài
export class ResponseCheckSttExam {
  status: boolean;
  payload: number;
  message: string;
  result: ResultExam;
}

// lịch sử làm bài
export class ResponseCapacityHistory {
  status: boolean;
  payload: ResultExam;
  exam: ExamCapacity;
}

export class CapacityExamHistory {
  capacity: Capacity;
  round: CapacityRound;
  exam: ExamCapacity;
}
