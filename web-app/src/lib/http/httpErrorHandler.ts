interface ErrorWithCode {
  code: string;
}

const HttpErrorCodes = {
  badRequest: 'BAD_REQUEST',
  networkError: 'NETWORK_ERROR',
  unexpectedError: 'UNEXPECTED_ERROR'
} as const;

class HttpErrorHandler {
  handleError(error: ErrorWithCode): void {
    switch (error.code) {
      case HttpErrorCodes.badRequest: {
        this._handleBadRequest();
        break;
      }

      case HttpErrorCodes.networkError:
      case HttpErrorCodes.unexpectedError:
      default:
        this._handleUnexpectedError();
    }
  }

  private _handleBadRequest(): void {
    console.error({
      title: 'Error',
      description: 'Error requesting',
      options: { autoClose: 5000 }
    });
  }

  private _handleUnexpectedError(): void {
    console.error({
      title: 'Ups!',
      description: 'Unexpected error',
      options: { autoClose: 5000 }
    });
  }
}

export default HttpErrorHandler;
