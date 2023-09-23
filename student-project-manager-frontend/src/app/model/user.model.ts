export class User {
  constructor(
    public id: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public password: string,
    public role: string
  ) {}
}