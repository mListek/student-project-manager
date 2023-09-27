export class UserRequest {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public role: string,
    public code: string
  ) {}
}