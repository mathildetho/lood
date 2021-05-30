import CustomError from './CustomError';

class UnauthorizedError extends CustomError {
  status = 401;

  serializeError(): { status: number; errors: string[] } {
    return {
      status: 401,
      errors: [this.message],
    };
  }
}

export default UnauthorizedError;
