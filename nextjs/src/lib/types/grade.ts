import { Subject } from "./subject";

export type Grade = {
  id: number;
  level: number;
  name: string;
  description?: string;
  subjects?: Subject[];
}
