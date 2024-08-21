import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = Cookies.get('user')
  ? JSON.parse(Cookies.get('user') ?? '')
  : null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, action) => action.payload,
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
