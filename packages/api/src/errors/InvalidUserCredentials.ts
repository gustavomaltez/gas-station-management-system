// Generic Invalid User Credentials Error --------------------------------------

export abstract class InvalidUserCredentials extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserCredentials';
  }
}

// Specific Invalid User Credentials Errors ------------------------------------

export class InvalidUserEmail extends InvalidUserCredentials {
  constructor(email: string) {
    super(`Invalid User Email. The provided email "${email}" is not valid. Email must follow the standard (user@provider.extension), with only alphanumeric characters and the following special characters: ., -, _.`);
  }
}

export class DuplicatedUserEmail extends InvalidUserCredentials {
  constructor(email: string) {
    super(`Duplicated User Email. The provided email "${email}" is already in use.`);
  }
}

export class InvalidUserEmailOrPassword extends InvalidUserCredentials {
  constructor() {
    super('Invalid User Email or Password. The provided email or password is not valid.');
  }
}