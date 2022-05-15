import { Team } from "./team";

export class Round {
    id: number;
    name: string;
    image: string;
    description: string;
    contest_id: number;
    type_exam_id: number;
    end_time: Date;
    teams: Array<Team>;
}
