import { Team } from "./team";

export class ResultRound {
    id: number;
    point: number;
    team: Team;
    image: string;
    name: string;
    result: {
        point: number;
    }
}
