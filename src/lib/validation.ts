/**
 * Comprehensive validation utilities
 * Provides type-safe validation with detailed error messages
 */

import { VALIDATION_RULES } from './constants';
import { ValidationError } from './errors';

export interface ValidationResult<T = any> {
  isValid: boolean;
  data?: T;
  errors: ValidationError[];
}

export class Validator {
  private errors: ValidationError[] = [];

  /**
   * Validate email format
   */
  validateEmail(email: string, fieldName: string = 'email'): this {
    if (!email) {
      this.errors.push(new ValidationError('Email is required', fieldName));
      return this;
    }

    if (!VALIDATION_RULES.email.test(email)) {
      this.errors.push(new ValidationError('Please enter a valid email address', fieldName));
    }

    return this;
  }

  /**
   * Validate password strength
   */
  validatePassword(password: string, fieldName: string = 'password'): this {
    if (!password) {
      this.errors.push(new ValidationError('Password is required', fieldName));
      return this;
    }

    if (password.length < VALIDATION_RULES.password.minLength) {
      this.errors.push(
        new ValidationError(
          `Password must be at least ${VALIDATION_RULES.password.minLength} characters long`,
          fieldName
        )
      );
    }

    if (!VALIDATION_RULES.password.pattern.test(password)) {
      this.errors.push(
        new ValidationError(
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          fieldName
        )
      );
    }

    return this;
  }

  /**
   * Validate name format
   */
  validateName(name: string, fieldName: string = 'name'): this {
    if (!name) {
      this.errors.push(new ValidationError('Name is required', fieldName));
      return this;
    }

    if (name.length < VALIDATION_RULES.name.minLength) {
      this.errors.push(
        new ValidationError(
          `Name must be at least ${VALIDATION_RULES.name.minLength} characters long`,
          fieldName
        )
      );
    }

    if (name.length > VALIDATION_RULES.name.maxLength) {
      this.errors.push(
        new ValidationError(
          `Name must not exceed ${VALIDATION_RULES.name.maxLength} characters`,
          fieldName
        )
      );
    }

    if (!VALIDATION_RULES.name.pattern.test(name)) {
      this.errors.push(
        new ValidationError('Name can only contain letters and spaces', fieldName)
      );
    }

    return this;
  }

  /**
   * Validate required field
   */
  validateRequired(value: any, fieldName: string): this {
    if (value === null || value === undefined || value === '') {
      this.errors.push(new ValidationError(`${fieldName} is required`, fieldName));
    }

    return this;
  }

  /**
   * Validate number range
   */
  validateNumberRange(
    value: number,
    min: number,
    max: number,
    fieldName: string
  ): this {
    if (isNaN(value)) {
      this.errors.push(new ValidationError(`${fieldName} must be a valid number`, fieldName));
      return this;
    }

    if (value < min || value > max) {
      this.errors.push(
        new ValidationError(
          `${fieldName} must be between ${min} and ${max}`,
          fieldName
        )
      );
    }

    return this;
  }

  /**
   * Validate string length
   */
  validateLength(
    value: string,
    min: number,
    max: number,
    fieldName: string
  ): this {
    if (value.length < min || value.length > max) {
      this.errors.push(
        new ValidationError(
          `${fieldName} must be between ${min} and ${max} characters`,
          fieldName
        )
      );
    }

    return this;
  }

  /**
   * Get validation result
   */
  getResult<T = any>(data?: T): ValidationResult<T> {
    return {
      isValid: this.errors.length === 0,
      data: this.errors.length === 0 ? data : undefined,
      errors: this.errors,
    };
  }

  /**
   * Reset validator state
   */
  reset(): this {
    this.errors = [];
    return this;
  }
}

/**
 * Validation schemas for common forms
 */
export const ValidationSchemas = {
  login: (data: { email: string; password: string }) => {
    return new Validator()
      .validateEmail(data.email)
      .validateRequired(data.password, 'password')
      .getResult(data);
  },

  signup: (data: { name: string; email: string; password: string; confirmPassword: string }) => {
    const validator = new Validator()
      .validateName(data.name)
      .validateEmail(data.email)
      .validatePassword(data.password);

    if (data.password !== data.confirmPassword) {
      validator.errors.push(new ValidationError('Passwords do not match', 'confirmPassword'));
    }

    return validator.getResult(data);
  },

  product: (data: { quantity: number }) => {
    return new Validator()
      .validateNumberRange(data.quantity, 1, 10, 'quantity')
      .getResult(data);
  },
};

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim(); // Remove leading/trailing whitespace
};

/**
 * Validate file upload
 */
export const validateFile = (
  file: File,
  maxSize: number = 5 * 1024 * 1024, // 5MB
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']
): ValidationResult<File> => {
  const validator = new Validator();

  if (file.size > maxSize) {
    validator.errors.push(
      new ValidationError(`File size must be less than ${maxSize / (1024 * 1024)}MB`, 'file')
    );
  }

  if (!allowedTypes.includes(file.type)) {
    validator.errors.push(
      new ValidationError(`File type must be one of: ${allowedTypes.join(', ')}`, 'file')
    );
  }

  return validator.getResult(file);
};