import { useMediaQuery } from 'react-responsive';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { block } from '../../../../helpers/bem.helpers';
import './DateOfBirthSelect.scss';

const b = block('DateOfBirthSelect');

export const DateOfBirthSelect = ({
  days,
  months,
  years,
  handleRegisterChange,
  errors,
  values,
  isSubmitting,
}: {
  days: number[];
  months: number[];
  years: number[];
  handleRegisterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errors: any;
  values: any;
  isSubmitting: boolean;
}) => {
  const isDesktopView = useMediaQuery({
    query: '(min-width: 1170px)',
  });
  const isError = Boolean(
    isSubmitting && (errors.bDay || errors.bMonth || errors.bYear)
  );

  return (
    <div className={b()}>
      <div className={b('grid')}>
        <select
          className={b('select', { error: isError })}
          name="bDay"
          value={values.bDay}
          onChange={handleRegisterChange}
        >
          {days.map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          className={b('select', { error: isError })}
          name="bMonth"
          value={values.bMonth}
          onChange={handleRegisterChange}
        >
          {months.map((month) => (
            <option value={month} key={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          className={b('select', { error: isError })}
          name="bYear"
          value={values.bYear}
          onChange={handleRegisterChange}
        >
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {isSubmitting && errors.bYear && (
        <ErrorMessage
          fieldName="bYear"
          isDesktopView={isDesktopView}
          arrowDefinition={!isDesktopView ? 'bottom' : 'left'}
          style={
            isDesktopView
              ? {
                  left: '-82%',
                  top: 15,
                }
              : { top: 14 }
          }
        />
      )}
    </div>
  );
};
