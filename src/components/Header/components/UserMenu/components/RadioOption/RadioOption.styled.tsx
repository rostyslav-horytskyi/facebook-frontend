import styled from 'styled-components';
import { HoverType } from '../../../../../../types';
import { hoverStyles } from '../../../../../../index.styled';

export const Label = styled.label<{ $hoverType: HoverType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 50px;
  font-weight: 600;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;

  ${({ $hoverType }) => hoverStyles[$hoverType] ?? ''}
`;

export const Input = styled.input`
  width: 20px;
  height: 20px;
`;
