import React from 'react';
import { ErrorMessage as FormikErrorMessage } from 'formik';
import './ErrorMessage.scss';
import { block } from '../../../../helpers/bem.helpers';

const b = block('ErrorMessage');

export const ErrorMessage = ({
  fieldName,
  isDesktopView,
  style,
  arrowDefinition,
}: {
  fieldName: string;
  isDesktopView: boolean;
  arrowDefinition: 'left' | 'right' | 'bottom' | 'top';
  style?: React.CSSProperties;
}) => (
  <div className={b({ desktop: isDesktopView })} style={style}>
    <FormikErrorMessage name={fieldName} />
    <div className={b('arrow', { [arrowDefinition]: true })} />
  </div>
);
