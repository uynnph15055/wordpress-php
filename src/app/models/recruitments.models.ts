import { Capacity } from "./capacity";
import { Contest } from "./contest";
import { Enterprise } from "./enterprise.model";

export class Recruitments {
    id: number;
    name: string;
    description: string;
    start_time: string;
    end_time: string;
    image: string;
    contest: Array<Capacity>;
    enterprise: Array<Enterprise>;
}
