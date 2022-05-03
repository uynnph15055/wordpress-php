import { Contest } from "./contest";
import { ContestMember } from "./contest-member";

export class Team {
    id: number;
    image: string;
    contest_id: number;
    name: string;
    members: Array<ContestMember>;
    contests: Array<Contest>;
}
