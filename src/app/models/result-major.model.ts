import { Contest } from "./contest";
import { User } from "./user";

export class ResultMajor {
    id: number;
    rank: number;
    reward_point: number;
    contest_name: string;
    name: string;
    user: User;
    contest: Contest;

}
