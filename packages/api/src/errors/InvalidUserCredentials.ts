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

export class InvalidUserCPF extends InvalidUserCredentials {
  constructor(cpf: string) {
    super(`Invalid User CPF. The provided CPF "${cpf}" is not valid. CPF must follow the standard (000.000.000-00).`);
  }
}

export class DuplicatedUserCredentials extends InvalidUserCredentials {
  constructor(email: string, cpf: string) {
    super(`Duplicated User Credentials. The provided email "${email}" and/or cpf "${cpf}" is already in use.`);
  }
}

export class InvalidUserEmailOrPassword extends InvalidUserCredentials {
  constructor() {
    super('Invalid User Email or Password. The provided email or password is not valid.');
  }
}