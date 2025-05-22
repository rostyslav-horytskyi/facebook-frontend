export const isFieldInvalid = (
  touched: boolean | undefined,
  error: string | undefined
) => Boolean(touched && error);

export const getErrorMessagePosition = (
  fieldName: string,
  isDesktopView: boolean
): 'left' | 'right' | 'bottom' => {
  if (!isDesktopView) return 'bottom';
  return fieldName === 'last_name' ? 'right' : 'left';
};
