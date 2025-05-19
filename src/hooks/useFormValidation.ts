import { useState, useCallback } from 'react';

/**
 * Generic form validation hook
 * 
 * This hook provides a reusable pattern for form validation
 * with custom validation functions.
 */

export type ValidationFunction<T> = (value: T) => string | null;

export type FieldValidators<T> = {
  [K in keyof T]?: ValidationFunction<T[K]>;
};

export type FormErrors<T> = {
  [K in keyof T]?: string | null;
};

interface UseFormValidationReturn<T> {
  errors: FormErrors<T>;
  validateField: (field: keyof T, value: T[keyof T]) => boolean;
  validateForm: (values: T) => boolean;
  setFieldError: (field: keyof T, error: string | null) => void;
  clearErrors: () => void;
  hasErrors: boolean;
}

/**
 * Custom hook for form validation
 * @param validators - Object mapping field names to validation functions
 * @returns Validation utilities
 */
export function useFormValidation<T extends Record<string, any>>(
  validators: FieldValidators<T>
): UseFormValidationReturn<T> {
  const [errors, setErrors] = useState<FormErrors<T>>({});
  
  // Validate a single field
  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]): boolean => {
      const validator = validators[field];
      
      if (!validator) {
        return true;
      }
      
      const error = validator(value);
      
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
      
      return !error;
    },
    [validators]
  );
  
  // Validate entire form
  const validateForm = useCallback(
    (values: T): boolean => {
      const newErrors: FormErrors<T> = {};
      let isValid = true;
      
      for (const field in validators) {
        if (validators.hasOwnProperty(field)) {
          const validator = validators[field];
          if (validator) {
            const error = validator(values[field]);
            if (error) {
              newErrors[field] = error;
              isValid = false;
            }
          }
        }
      }
      
      setErrors(newErrors);
      return isValid;
    },
    [validators]
  );
  
  // Set a field error manually
  const setFieldError = useCallback((field: keyof T, error: string | null) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);
  
  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);
  
  // Calculate if the form has any errors
  const hasErrors = Object.values(errors).some((error) => !!error);
  
  return {
    errors,
    validateField,
    validateForm,
    setFieldError,
    clearErrors,
    hasErrors,
  };
}