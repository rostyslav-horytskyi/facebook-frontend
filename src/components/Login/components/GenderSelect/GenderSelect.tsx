import { useMediaQuery } from 'react-responsive';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { block } from '../../../../helpers/bem.helpers';
import './GenderSelect.scss';

const b = block('GenderSelect');

export const GenderSelect = ({
  handleRegisterChange,
  errors,
  isSubmitting,
}: {
  handleRegisterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  isSubmitting: boolean;
}) => {
  const isDesktopView = useMediaQuery({
    query: '(min-width: 1170px)',
  });
  const isError = Boolean(isSubmitting && errors.gender);

  return (
    <div className={b()}>
      <div className={b('grid')}>
        <label htmlFor="male" className={b('label', { error: isError })}>
          Male
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="female" className={b('label', { error: isError })}>
          Female
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="custom" className={b('label', { error: isError })}>
          Custom
          <input
            type="radio"
            name="gender"
            id="custom"
            value="custom"
            onChange={handleRegisterChange}
          />
        </label>
      </div>
      {isError && (
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
