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
}
