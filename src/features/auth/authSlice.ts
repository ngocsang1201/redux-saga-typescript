import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/auth';

export interface LoginPayload {
  username: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  logging: boolean;
  currentUser: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

const { actions: authActions, reducer: authReducer } = authSlice;

export { authActions };

export const selectIsloggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLogging = (state: any) => state.auth.logging;

export default authReducer;
