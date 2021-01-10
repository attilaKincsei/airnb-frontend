export class InviteForm {
  email: string;
  lodgingsId: number;


  constructor(email: string, lodgingsId: number) {
    this.email = email;
    this.lodgingsId = lodgingsId;
  }
}
