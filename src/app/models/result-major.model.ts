import { Contest } from "./contest";
import { User } from "./user";

export class ResultMajor {
    id: number;
    rank: number;
    reward_point: number;
    contest_name: string;
    user_name: string;
    user: User;
    contest: Contest;
    avatar: string;

}
