import CustomError from './CustomError';

class NotFoundError extends CustomError {
  status = 404;

  serializeError(): { status: number; errors: string[] } {
    return {
      status: 404,
      errors: [this.message],
    };
  }
}

export default NotFoundError;
