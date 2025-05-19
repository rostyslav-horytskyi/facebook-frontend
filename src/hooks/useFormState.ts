import { useState, useCallback } from 'react';
import { useFormValidation, FieldValidators } from './useFormValidation';

/**
 * Custom hook for managing form state
 * Combines form values and validation
 */

interface UseFormProps<T> {
  initialValues: T;
  validators?: FieldValidators<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Record<keyof T, string | null | undefined>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  resetForm: () => void;
}

export function useFormState<T extends Record<string, any>>({
  initialValues,
  validators = {} as FieldValidators<T>,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  // State management
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get validation functions
  const { errors, validateField, validateForm, setFieldError } = useFormValidation<T>(validators);
  
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
      setTouched((prev) => ({
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
    },
    []
  );
  
  // Set multiple values at once
  const setMultipleValues = useCallback(
    (newValues: Partial<T>) => {
      setValues((prev) => ({
        ...prev,
        ...newValues,
      }));
    },
    []
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
      
      setTouched(allTouched);
      
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
    setTouched({} as Record<keyof T, boolean>);
  }, [initialValues]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setValues: setMultipleValues,
    resetForm,
  };
}