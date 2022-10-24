import { LoginDTO } from '../../dto';
import { HttpData } from '../../helpers/apiHelper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../models/Status';
import { UserModel } from '../../models';
import { AppThunk } from '../store';
import { loginAPI } from '../api/userApi';
import { LoginModel } from '../../models/Login';

interface LoginState {
  status: Status;
  loginData: LoginModel | undefined;
  message: string;
}

const initialState: LoginState = {
  status: Status.idle,
  loginData: undefined,
  message: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state: LoginState,
      action: PayloadAction<LoginModel | undefined>,
    ) => {
      state.loginData = action.payload;
      state.status = Status.success;
    },
    message: (state: LoginState, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    status: (state: LoginState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    logout: state => {
      state.loginData = undefined;
      state.message = '';
      state.status = Status.idle;
    },
  },
});

export const loginAction =
  ({ ...input }: LoginDTO): AppThunk =>
  async dispatch => {
    dispatch(userSlice.actions.status(Status.loading));
    console.log('inputtttttttttt', input);
    const result: HttpData<LoginModel> = await loginAPI(input);
    if (result.error) {
      dispatch(userSlice.actions.status(Status.error));
      dispatch(userSlice.actions.message(result?.message));
    } else {
      dispatch(userSlice.actions.login(result.data));
      dispatch(userSlice.actions.message(result?.message));
    }
  };
export const logoutAction = (): AppThunk => async dispatch => {
  console.log('logoutttt');
  dispatch(userSlice.actions.logout());
};
export const { login } = userSlice.actions;

// export const selectUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
