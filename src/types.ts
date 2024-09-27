import { RuleSet } from 'styled-components';

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  bYear: number;
  bMonth: number;
  bDay: number;
  gender: string;
  message: string;
};

export type UserError = { message: string };

export type HoverType = 'hover' | 'middleHover' | 'deepHover';

export type HoverStyles = {
  hover: RuleSet<object>;
  middleHover: RuleSet<object>;
  deepHover: RuleSet<object>;
};
