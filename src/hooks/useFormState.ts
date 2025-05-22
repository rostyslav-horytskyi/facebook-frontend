import { useState, useCallback, useRef, useEffect } from 'react';
import { useFormValidation, FieldValidators, FormErrors } from './useFormValidation';

/**
 * Custom hook for managing form state
 * 
 * Provides a complete form state management solution with:
 * - Values and change handling
 * - Field-level validation
 * - Touch tracking
 * - Submission handling
 * - Form reset
 */

export interface UseFormProps<T> {
  /** Initial form values */
  initialValues: T;
  /** Validation functions for each field */
  validators?: FieldValidators<T>;
  /** Form submission handler */
  onSubmit: (values: T) => void | Promise<void>;
  /** Reset form when initialValues change */
  resetOnInitialValuesChange?: boolean;
}

export interface UseFormReturn<T> {
  /** Current form values */
  values: T;
  /** Validation errors for each field */
  errors: FormErrors<T>;
  /** Tracks which fields have been interacted with */
  touched: Record<keyof T, boolean>;
  /** Whether form is currently submitting */
  isSubmitting: boolean;
  /** Whether all form fields are valid */
  isValid: boolean;
  /** Whether any fields have been modified from initial values */
  isDirty: boolean;
  /** Handle input change event */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handle input blur event */
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Handle form submission */
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Set a single field value programmatically */
  setValue: (field: keyof T, value: any) => void;
  /** Set multiple field values programmatically */
  setValues: (values: Partial<T>) => void;
  /** Set touched state for a field */
  setTouched: (field: keyof T, isTouched: boolean) => void;
  /** Reset form to initial state */
  resetForm: () => void;
}

/**
 * Hook for complete form state management
 * 
 * @param options - Form configuration options
 * @returns Form state and handlers
 * 
 * @example
 * const {
 *   values,
 *   errors,
 *   touched,
 *   isSubmitting,
 *   handleChange,
 *   handleBlur,
 *   handleSubmit,
 *   resetForm
 * } = useFormState({
 *   initialValues: { email: '', password: '' },
 *   validators: {
 *     email: (value) => !value ? 'Email is required' : null,
 *     password: (value) => !value ? 'Password is required' : null
 *   },
 *   onSubmit: async (values) => {
 *     await loginUser(values);
 *   }
 * });
 */
export function useFormState<T extends Record<string, any>>({
  initialValues,
  validators = {} as FieldValidators<T>,
  onSubmit,
  resetOnInitialValuesChange = false,
}: UseFormProps<T>): UseFormReturn<T> {
  // State management
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouchedFields] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValuesRef = useRef(initialValues);
  
  // Get validation functions
  const { 
    errors, 
    validateField, 
    validateForm, 
    setFieldError,
    clearErrors,
    hasErrors 
  } = useFormValidation<T>(validators);
  
  // Reset form when initialValues change (if enabled)
  useEffect(() => {
    if (resetOnInitialValuesChange && 
        JSON.stringify(initialValuesRef.current) !== JSON.stringify(initialValues)) {
      resetForm();
      initialValuesRef.current = initialValues;
    }
  }, [initialValues, resetOnInitialValuesChange]);
  
  // Check if form is dirty (values differ from initial)
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);
  
  // Handle input change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = event.target;
      const fieldValue = type === 'checkbox' ? checked : value;
      
      setValues((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));
      
      // Validate field if already touched
      if (touched[name as keyof T]) {
        validateField(name as keyof T, fieldValue as T[keyof T]);
      }
    },
    [touched, validateField]
  );
  
  // Handle input blur (focus lost)
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      
      // Mark field as touched
      setTouchedFields((prev) => ({
        ...prev,
        [name]: true,
      }));
      
      // Validate field on blur
      validateField(name as keyof T, value as T[keyof T]);
    },
    [validateField]
  );
  
  // Set a single value programmatically
  const setValue = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));
      
      // Validate if field is touched
      if (touched[field]) {
        validateField(field, value);
      }
    },
    [touched, validateField]
  );
  
  // Set multiple values at once
  const setMultipleValues = useCallback(
    (newValues: Partial<T>) => {
      setValues((prev) => {
        const updatedValues = { ...prev, ...newValues };
        
        // Validate any touched fields that were updated
        Object.keys(newValues).forEach(key => {
          const field = key as keyof T;
          if (touched[field]) {
            validateField(field, updatedValues[field]);
          }
        });
        
        return updatedValues;
      });
    },
    [touched, validateField]
  );
  
  // Set touched state for a field
  const setFieldTouched = useCallback(
    (field: keyof T, isTouched: boolean) => {
      setTouchedFields((prev) => ({
        ...prev,
        [field]: isTouched,
      }));
      
      // Validate field if being marked as touched
      if (isTouched) {
        validateField(field, values[field]);
      }
    },
    [validateField, values]
  );
  
  // Form submission handler
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({
          ...acc,
          [key]: true,
        }),
        {} as Record<keyof T, boolean>
      );
      
      setTouchedFields(allTouched);
      
      // Validate entire form
      const isValid = validateForm(values);
      
      if (!isValid) {
        return;
      }
      
      // Handle submission
      try {
        setIsSubmitting(true);
        await onSubmit(values);
      } catch (error) {
        // Handle form submission error
        if (error instanceof Error) {
          // Set a generic form error
          setFieldError('_form' as keyof T, error.message);
        } else {
          // Handle non-Error objects
          setFieldError('_form' as keyof T, 'An unexpected error occurred');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm, onSubmit, setFieldError]
  );
  
  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setTouchedFields({} as Record<keyof T, boolean>);
    clearErrors();
  }, [initialValues, clearErrors]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid: !hasErrors,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setValues: setMultipleValues,
    setTouched: setFieldTouched,
    resetForm,
  };
}