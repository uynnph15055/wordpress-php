import { Enterprise } from "./enterprise.model";
import { Judges } from "./judges.model";
import { Round } from "./round.model";
import { Team } from "./team";

export class Contest {
    id: number;
    name: string;
    img: string;
    date_start: Date;
    register_deadline: Date;
    description: string;
    major_id: number;
    status: number;
    teams: Array<Team>
    rounds: Array<Round>
    enterprise: Array<Enterprise>;
    judges: Array<Judges>
}
