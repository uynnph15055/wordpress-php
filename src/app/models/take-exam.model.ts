import { Exam } from "./exam.model";

export class TakeExam {
    id: number;
    round_team_id: number;
    exam_id: number;
    result_url: string;
    final_point: string;
    exam: Exam;
}
