import { Message } from "./message.model";
import { Task } from "./task.model";

export class Team {
  constructor(
    public id: number,
    public name: string,
    public code: string,
    public messages: Message[],
    public tasks: Task[]
  ) {}
}