export class UserRequest {
  constructor(
    public email: string,
    public firstname: string,
    public lastname: string,
    public password: string,
    public role: string,
    public code: string
  ) {}
}