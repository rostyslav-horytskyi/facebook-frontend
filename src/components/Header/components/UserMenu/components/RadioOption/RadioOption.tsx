import * as Styled from './RadioOption.styled';
import { HOVERS } from '../../../../../../constants';

export const RadioOption = ({
  id,
  name,
  label,
}: {
  id: string;
  name: string;
  label: string;
}) => (
  <Styled.Label htmlFor={id} $hoverType={HOVERS.HOVER}>
    <span>{label}</span>
    <Styled.Input type="radio" name={name} id={id} />
  </Styled.Label>
);
