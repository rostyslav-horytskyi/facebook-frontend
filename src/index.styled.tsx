import { css } from 'styled-components';
import { HoverStyles } from './types';

export const hoverStyles: HoverStyles = {
  hover: css`
    &:hover {
      background: var(--bg-secondary);
    }
  `,
  middleHover: css`
    &:hover {
      background: var(--bg-third);
    }
  `,
  deepHover: css`
    &:hover {
      background: #d4d6da3a;
    }
  `,
};
