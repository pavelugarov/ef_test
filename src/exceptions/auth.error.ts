import HttpException from './http.exception';

export class NotAuthorizedException extends HttpException {
  constructor() {
    super(401, 'Authorization Required', 101);
  }
}

export class WrongCredinalsException extends HttpException {
  constructor() {
    super(401, 'Wrong Credinals', 102);
  }
}

export class NotPermittedException extends HttpException {
  constructor() {
    super(403, 'Not Permitted', 103);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super(400, 'User not found', 104);
  }
}

export class UserExistsException extends HttpException {
  constructor() {
    super(400, 'User already exists', 105);
  }
}

export class UserBlockedException extends HttpException {
  constructor() {
    super(400, 'The user has been blocked', 106);
  }
}




