/**
 * Common validation utilities
 *
 * Reusable validation patterns and helpers for forms.
 */

// Email validation
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation - at least 8 chars, 1 uppercase, 1 lowercase, 1 number
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

// Name validation - 2-30 characters, letters, spaces, hyphens, and apostrophes
export const NAME_REGEX = /^[A-Za-z\s'-]{2,30}$/;

/**
 * Validates an email address
 * @param email - Email to validate
 * @returns True if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

/**
 * Validates a password
 * @param password - Password to validate
 * @returns True if valid, false otherwise
 */
export const isValidPassword = (password: string): boolean =>
  PASSWORD_REGEX.test(password);

/**
 * Validates a name (first or last)
 * @param name - Name to validate
 * @returns True if valid, false otherwise
 */
export const isValidName = (name: string): boolean => NAME_REGEX.test(name);

/**
 * Get error message for email validation
 * @param email - Email to validate
 * @returns Error message or null if valid
 */
export const getEmailError = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }

  return null;
};

/**
 * Get error message for password validation
 * @param password - Password to validate
 * @returns Error message or null if valid
 */
export const getPasswordError = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  if (!isValidPassword(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }

  return null;
};

/**
 * Get error message for name validation
 * @param name - Name to validate
 * @param fieldName - Name of the field (e.g., 'First name', 'Last name')
 * @returns Error message or null if valid
 */
export const getNameError = (
  name: string,
  fieldName: string = 'Name'
): string | null => {
  if (!name) {
    return `${fieldName} is required`;
  }

  if (name.length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }

  if (!isValidName(name)) {
    return `${fieldName} contains invalid characters`;
  }

  return null;
};
