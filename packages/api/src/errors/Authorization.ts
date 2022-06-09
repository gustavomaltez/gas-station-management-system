// Generic Authorization Error --------------------------------------

export abstract class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

// Specific Authorization Errors ------------------------------------

export class AuthorizationHeaderNotProvided extends AuthorizationError {
  constructor() {
    super(`Unable to authenticate user. The authorization header has not been provided. You should provide the auth header with the following format: "Authorization: Bearer <token>".`);
  }
}

export class InvalidToken extends AuthorizationError {
  constructor(token: string) {
    super(`Unable to authenticate user. The provided token '${token}' is not valid.`);
  }
}