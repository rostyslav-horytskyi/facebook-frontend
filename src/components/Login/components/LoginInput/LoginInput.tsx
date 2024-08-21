import './LoginInput.scss';
import React from 'react';
import { useField } from 'formik';
import { useMediaQuery } from 'react-responsive';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { block } from '../../../../helpers/bem.helpers';

const b = block('LoginInput');

export default function LoginInput({
  bottom,
  ...inputProps
}: React.InputHTMLAttributes<HTMLInputElement> & {
  bottom?: boolean;
}) {
  const [field, meta] = useField({
    name: inputProps.name ?? '',
    type: inputProps.type,
  });
  const desktopView = useMediaQuery({ query: '(min-width: 850px)' });
  const isError = Boolean(meta.touched && meta.error);
  const errorMessageArrowDefinition = desktopView
    ? 'left'
    : bottom
      ? 'bottom'
      : 'top';

  return (
    <div className={b()}>
      {!bottom && isError && (
        <ErrorMessage
          fieldName={field.name}
          isDesktopView={desktopView}
          arrowDefinition={errorMessageArrowDefinition}
          style={{
            transform: 'translateY(4px)',
          }}
        />
      )}
      <input
        className={b('input', { error: isError })}
        {...field}
        {...inputProps}
      />
      {bottom && isError && (
        <ErrorMessage
          fieldName={field.name}
          isDesktopView={desktopView}
          arrowDefinition={errorMessageArrowDefinition}
        />
      )}
      {isError && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView ? '63%' : '15px'}` }}
        />
      )}
    </div>
  );
}
