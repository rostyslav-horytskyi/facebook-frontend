import './RegisterInput.scss';
import React from 'react';
import { useField } from 'formik';
import { useMediaQuery } from 'react-responsive';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { block } from '../../../../helpers/bem.helpers';

const b = block('RegisterInput');

export default function RegisterInput(
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
) {
  const { name, type } = inputProps;
  const [field, meta] = useField({
    name: name ?? '',
    type,
  });
  const isTabletView = useMediaQuery({ query: '(min-width: 539px)' });
  const isDesktopView = useMediaQuery({ query: '(min-width: 1170px)' });
  const isFirsNameInTablet = isDesktopView && field.name === 'first_name';
  const isLastNameInTablet = isDesktopView && field.name === 'last_name';
  const isError = Boolean(meta.touched && meta.error);
  const errorMessageArrowDefinition =
    isDesktopView && field.name !== 'last_name'
      ? 'left'
      : isDesktopView && field.name === 'last_name'
        ? 'right'
        : !isDesktopView && 'bottom';

  return (
    <div className={b()}>
      <input
        className={b('input', { error: isError })}
        style={{
          width: `${
            isTabletView &&
            (field.name === 'first_name' || field.name === 'last_name')
              ? '100%'
              : isTabletView &&
                  (field.name === 'email' || field.name === 'password')
                ? '370px'
                : '300px'
          }`,
        }}
        {...field}
        {...inputProps}
      />
      {isError && (
        <>
          <ErrorMessage
            fieldName={field.name}
            arrowDefinition={errorMessageArrowDefinition || 'left'}
            isDesktopView={isDesktopView}
            style={{
              transform: 'translateY(2px)',
              left: `${isFirsNameInTablet ? '-107%' : isLastNameInTablet ? '107%' : ''}`,
            }}
          />
          <i className="error_icon" />
        </>
      )}
    </div>
  );
}
