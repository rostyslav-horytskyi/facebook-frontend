import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HoverType } from '../../../../types';
import { hoverStyles } from '../../../../index.styled';

export const MenuItemWrapper = styled.div<{ $hoverType: HoverType }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding: 7px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 10px;

  ${({ $hoverType }) => hoverStyles[$hoverType] ?? ''}
`;

export const AbsoluteWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 360px;
  height: fit-content;
  border-radius: 10px;
  background: var(--bg-primary);
  box-shadow: 2px 2px 2px var(--shadow-1);
  user-select: none;
  padding: 10px;
  }

  ${MenuItemWrapper} {
    margin-top: 0;
  }
`;

export const AbsoluteHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 24px;
`;

export const SmallCircle = styled.div`
  position: relative;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 11px;
  background: var(--bg-third);
  cursor: pointer;
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 360px;
  border-radius: 10px;
  background: var(--bg-primary);
  box-shadow: 2px 2px 2px var(--shadow-1);
  user-select: none;
  padding: 10px;

  @media (max-width: 400px) {
    width: 340px;
  }
`;

export const MenuHeader = styled(Link)<{ $hoverType: HoverType }>`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  gap: 10px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  ${({ $hoverType }) => hoverStyles[$hoverType] ?? ''}
`;

export const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span:first-of-type {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 1px;
  }

  span:last-of-type {
    font-size: 14px;
  }
`;

export const Splitter = styled.div`
  width: 100%;
  height: 1px;
  background: var(--bg-third);
  margin-top: 5px;
`;
