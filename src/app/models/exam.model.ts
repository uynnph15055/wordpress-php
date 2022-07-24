export class Exam {
  id: number;
}

export class ExamCapacity {
  questions: {
    id: number;
    content: string;
    type: number; // 0: 1 đáp án, 1: nhiều đáp án
    answers: {
      id: number;
      content: string;
    }[];
  }[];
  id: number;
  time: number;
  time_type: number;
  exam_at: Date;
  name: string;
  time_exam: number; // thời gian làm bài (phút)
}
