import { Task } from "./task.model";
import { Team } from "./team.model";

export class User {
  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public role: string,
    public teams: Team[],
    public tasks: Task[]
  ) {}
}