import { Round } from "./round.model";

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
}
