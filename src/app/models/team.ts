import { ContestMember } from "./contest-member";

export class Team {
    id: number;
    image: string;
    contest_id: number;
    members: Array<ContestMember>
}
