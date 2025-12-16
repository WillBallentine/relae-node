export class RelaeError extends Error {
  public status?: number;
  public raw?: any;

  constructor(message: string, status?: number, raw?: any) {
    super(message);
    this.name = "RelaeError";
    this.status = status;
    this.raw = raw;
  }
}

export class UnauthorizedError extends RelaeError {
  constructor(message = "Unauthorized", raw?: any) {
    super(message, 401, raw);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends RelaeError {
  constructor(message = "Forbidden", raw?: any) {
    super(message, 403, raw);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends RelaeError {
  constructor(message = "Not Found", raw?: any) {
    super(message, 404, raw);
    this.name = "NotFoundError";
  }
}

export class RateLimitError extends RelaeError {
  constructor(message = "Rate Limit Exceeded", raw?: any) {
    super(message, 429, raw);
    this.name = "RateLimitError";
  }
}

export class InternalServerError extends RelaeError {
  constructor(message = "Internal Server Error", raw?: any) {
    super(message, 500, raw);
    this.name = "InternalServerError";
  }
}
