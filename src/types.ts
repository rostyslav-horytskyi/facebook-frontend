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
  picture: string;
  verified: boolean;
};

export type LoginInfo = {
  id: string;
  first_name: string;
  last_name: string;
  message: string;
  picture: string;
  token: string;
  username: string;
  verified: boolean;
};
