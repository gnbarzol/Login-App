export class TokenModel {
  readonly token_type: string;
  readonly expires_in: number;
  readonly access_token: any;

  readonly fechaInicio?: any;

  get authorization(): string {
    return `${this.token_type} ${this.access_token}`;
  }

  get isExpired(): boolean {
    const now = Date.now() / 1000;
    const expiry = this.fechaInicio + this.expires_in;
    return now > expiry;
  }

  constructor(token: TokenModel) {
    this.token_type = token.token_type;
    this.expires_in = token.expires_in;
    this.access_token = token.access_token;

    this.fechaInicio = token.fechaInicio ? token.fechaInicio : Date.now() / 1000;
  }
}
