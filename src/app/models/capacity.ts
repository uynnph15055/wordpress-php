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
  start_register_time: Date
  rounds: Round[];
  user_capacity_done: [] // ds user làm bài
  skills: { name: string, short_name: string }[]
}
