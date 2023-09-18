export class User {
  constructor(
    public email: string,
    public firstname: string,
    public lastname: string,
    public password: string,
    public salt: string,
    public teacher: boolean
  ) {}
}