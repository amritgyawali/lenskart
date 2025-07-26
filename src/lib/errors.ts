/**
 * Centralized error handling system
 * Provides consistent error types and handling across the application
 */

export enum ErrorCode {
  // Authentication errors
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  
  // Product errors
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  INVALID_QUANTITY = 'INVALID_QUANTITY',
  
  // Cart errors
  CART_EMPTY = 'CART_EMPTY',
  CART_ITEM_NOT_FOUND = 'CART_ITEM_NOT_FOUND',
  
  // Camera errors
  CAMERA_ACCESS_DENIED = 'CAMERA_ACCESS_DENIED',
  CAMERA_NOT_AVAILABLE = 'CAMERA_NOT_AVAILABLE',
  
  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  
  // Generic errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, AppError);
  }
}

export class ValidationError extends AppError {
  public readonly field?: string;

  constructor(message: string, field?: string) {
    super(message, ErrorCode.VALIDATION_ERROR, 400);
    this.field = field;
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, ErrorCode.INVALID_CREDENTIALS, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, ErrorCode.PRODUCT_NOT_FOUND, 404);
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed') {
    super(message, ErrorCode.NETWORK_ERROR, 0);
  }
}

export const ERROR_MESSAGES = {
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
  [ErrorCode.USER_NOT_FOUND]: 'User not found',
  [ErrorCode.EMAIL_ALREADY_EXISTS]: 'Email already exists',
  [ErrorCode.UNAUTHORIZED]: 'You are not authorized to perform this action',
  [ErrorCode.PRODUCT_NOT_FOUND]: 'Product not found',
  [ErrorCode.OUT_OF_STOCK]: 'Product is out of stock',
  [ErrorCode.INVALID_QUANTITY]: 'Invalid quantity specified',
  [ErrorCode.CART_EMPTY]: 'Your cart is empty',
  [ErrorCode.CART_ITEM_NOT_FOUND]: 'Item not found in cart',
  [ErrorCode.CAMERA_ACCESS_DENIED]: 'Camera access denied. Please grant permission to use virtual try-on.',
  [ErrorCode.CAMERA_NOT_AVAILABLE]: 'Camera not available on this device',
  [ErrorCode.NETWORK_ERROR]: 'Network connection error. Please check your internet connection.',
  [ErrorCode.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  [ErrorCode.VALIDATION_ERROR]: 'Please check your input and try again',
  [ErrorCode.INVALID_INPUT]: 'Invalid input provided',
  [ErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred',
  [ErrorCode.SERVER_ERROR]: 'Server error. Please try again later.',
} as const;

/**
 * Error handler utility function
 */
export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, ErrorCode.UNKNOWN_ERROR);
  }

  return new AppError('An unknown error occurred', ErrorCode.UNKNOWN_ERROR);
};

/**
 * Logger utility for error tracking
 */
export const logError = (error: AppError, context?: Record<string, any>) => {
  const errorLog = {
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    timestamp: error.timestamp,
    stack: error.stack,
    context,
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('Application Error:', errorLog);
  } else {
    // In production, send to error tracking service
    // Example: Sentry, LogRocket, etc.
    console.error(JSON.stringify(errorLog));
  }
};