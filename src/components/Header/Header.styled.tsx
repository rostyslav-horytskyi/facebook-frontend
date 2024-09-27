import styled from 'styled-components';
import { HoverType } from '../../types';
import { hoverStyles } from '../../index.styled';

export const Circle = styled.div<{ $hoverType: HoverType }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $hoverType }) => hoverStyles[$hoverType] ?? ''}
`;
