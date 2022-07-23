import { Round } from "./round.model";
import { Skill } from "./skill.models";
import { User } from "./user";

export class Capacity {
  id: number;
  name: string;
  img: string;
  date_start: Date;
  register_deadline: Date;
  description: string;
  major_id: number;
  status: number;
  slug_name: string;
  rounds: Round[];
  skills: Array<Skill>
  users: Array<User>;
}
