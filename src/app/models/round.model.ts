import { Contest } from './contest';
import { Judges } from "./judges.model";
import { Team } from "./team";

export class Round {
    id: number;
    name: string;
    image: string;
    description: string;
    end_time: Date;
    contest_id: number;
    type_exam_id: number;
    start_time: Date;
    teams: Array<Team>;
    judges: Array<Judges>;
    contest: Contest;
    exams: Array<exams>;
}

class exams {
    name: string;
    external_url: string;
    description: string;
}
