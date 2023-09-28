import { User } from "./user.model";

export class Message {
  constructor(
    public label: string,
    public creationDate: string,
    public user: User
  ) {}
}