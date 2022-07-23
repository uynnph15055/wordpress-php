export class Exam {
    id: number;
}

export class ExamCapacity {
    questions: {
        id: number,
        content: string,
        answers: {
            id: number,
            content: string
        }[]
    }[];
    time: number;
    time_type: number;
    exam_at: Date;
    name: string;
    time_exam: number; // thời gian làm bài (phút)
}