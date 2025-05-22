import { useState, useCallback, useMemo } from 'react';

/**
 * Generic form validation hook
 * 
 * Provides a reusable pattern for form validation with:
 * - Custom validation functions
 * - Field-level and form-level validation
 * - Performance optimizations
 * - Strong TypeScript typing
 */

/**
 * Function that validates a field value
 * @returns Error message or null if valid
 */
export type ValidationFunction<T> = (value: T) => string | null;

/**
 * Object mapping field names to validation functions
 */
export type FieldValidators<T> = {
  [K in keyof T]?: ValidationFunction<T[K]>;
};

/**
 * Object containing validation errors for each field
 */
export type FormErrors<T> = {
  [K in keyof T]?: string | null;
};

/**
 * Return type for useFormValidation hook
 */
export interface UseFormValidationReturn<T> {
  /** Current validation errors */
  errors: FormErrors<T>;
  /** Validate a single field */
  validateField: (field: keyof T, value: T[keyof T]) => boolean;
  /** Validate all fields in the form */
  validateForm: (values: T) => boolean;
  /** Manually set an error for a field */
  setFieldError: (field: keyof T, error: string | null) => void;
  /** Clear all validation errors */
  clearErrors: () => void;
  /** Whether the form has any validation errors */
  hasErrors: boolean;
  /** Get error for a specific field */
  getFieldError: (field: keyof T) => string | null | undefined;
}

/**
 * Hook for form validation with custom validation functions
 * 
 * @param validators - Object mapping field names to validation functions
 * @returns Validation utilities and error state
 * 
 * @example
 * const { 
 *   errors, 
 *   validateField, 
 *   validateForm,
 *   hasErrors 
 * } = useFormValidation({
 *   email: (value) => !value ? 'Email is required' : null,
 *   password: (value) => value.length < 8 ? 'Password too short' : null
 * });
 */
export function useFormValidation<T extends Record<string, any>>(
  validators: FieldValidators<T>
): UseFormValidationReturn<T> {
  // State to store validation errors
  const [errors, setErrors] = useState<FormErrors<T>>({});
  
  // Memoize validator fields for performance
  const validatorFields = useMemo(() => Object.keys(validators) as Array<keyof T>, [validators]);
  
  // Validate a single field
  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]): boolean => {
      const validator = validators[field];
      
      // If no validator exists for this field, consider it valid
      if (!validator) {
        // Clear any existing errors for this field
        if (errors[field]) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
        return true;
      }
      
      // Run validation
      const error = validator(value);
      
      // Update errors state (only if changed to prevent unnecessary rerenders)
      setErrors((prev) => {
        if (prev[field] === error) return prev;
        
        if (error === null && prev[field]) {
          // Remove error if field is now valid
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        } else if (error !== null) {
          // Add/update error
          return { ...prev, [field]: error };
        }
        
        return prev;
      });
      
      return !error;
    },
    [validators, errors]
  );
  
  // Validate all fields in the form
  const validateForm = useCallback(
    (values: T): boolean => {
      const newErrors: FormErrors<T> = {};
      let isValid = true;
      
      // Check each field with a validator
      for (const field of validatorFields) {
        const validator = validators[field];
        if (validator) {
          const error = validator(values[field]);
          if (error) {
            newErrors[field] = error;
            isValid = false;
          }
        }
      }
      
      // Only update errors state if there are changes
      setErrors(newErrors);
      return isValid;
    },
    [validators, validatorFields]
  );
  
  // Set a field error manually
  const setFieldError = useCallback((field: keyof T, error: string | null) => {
    setErrors((prev) => {
      if (error === null) {
        // Remove error
        if (!prev[field]) return prev;
        
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      } else {
        // Add/update error
        if (prev[field] === error) return prev;
        return { ...prev, [field]: error };
      }
    });
  }, []);
  
  // Get error for a specific field
  const getFieldError = useCallback(
    (field: keyof T) => errors[field],
    [errors]
  );
  
  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);
  
  // Calculate if the form has any errors (memoized for performance)
  const hasErrors = useMemo(() => 
    Object.values(errors).some((error) => !!error), 
    [errors]
  );
  
  return {
    errors,
    validateField,
    validateForm,
    setFieldError,
    clearErrors,
    hasErrors,
    getFieldError,
  };
}