import { LoginDTO, ResetPassDTO, SignUpDTO } from '../../dto';
import { HttpData } from '../../helpers/apiHelper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../models/Status';
import { UserModel } from '../../models';
import { AppThunk } from '../store';
import { loginAPI, resetPassAPI, signUpAPI } from '../api/userApi';
import { LoginModel, ResetPassModel, SignUpModel } from '../../models/Login';

interface LoginState {
  status: Status;
  loginData: LoginModel | undefined;
  message: string;
}

const loginState: LoginState = {
  status: Status.idle,
  loginData: undefined,
  message: '',
};
interface SignUpState {
  statusSignUp: Status;
  signUpdata: SignUpModel | undefined;
  messageSignUp: string;
}

const signUpState: SignUpState = {
  statusSignUp: Status.idle,
  signUpdata: undefined,
  messageSignUp: '',
};
interface ResetPassState {
  statusResetPass: Status;
  resetPassData: ResetPassModel | undefined;
  messageResetPass: string;
}

const resetPassState: ResetPassState = {
  statusResetPass: Status.idle,
  resetPassData: undefined,
  messageResetPass: '',
};
const initialState: LoginState & SignUpState & ResetPassState = {
  ...loginState,
  ...signUpState,
  ...resetPassState,
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
    signUp: (
      state: SignUpState,
      action: PayloadAction<SignUpModel | undefined>,
    ) => {
      state.signUpdata = action.payload;
      state.statusSignUp = Status.success;
    },
    messageSignUp: (state: SignUpState, action: PayloadAction<string>) => {
      state.messageSignUp = action.payload;
    },
    statusSignUp: (state: SignUpState, action: PayloadAction<Status>) => {
      state.statusSignUp = action.payload;
    },
    resetStateSignUp: state => {
      state.signUpdata = undefined;
      state.messageSignUp = '';
      state.statusSignUp = Status.idle;
    },

    resetPass: (
      state: ResetPassState,
      action: PayloadAction<ResetPassModel | undefined>,
    ) => {
      state.resetPassData = action.payload;
      state.statusResetPass = Status.success;
    },
    messageResetPass: (
      state: ResetPassState,
      action: PayloadAction<string>,
    ) => {
      state.messageResetPass = action.payload;
    },
    statusResetPass: (state: ResetPassState, action: PayloadAction<Status>) => {
      state.statusResetPass = action.payload;
    },
    resetStateResetPass: state => {
      state.resetPassData = undefined;
      state.messageResetPass = '';
      state.statusResetPass = Status.idle;
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
export const signupAction =
  ({ ...input }: SignUpDTO): AppThunk =>
  async dispatch => {
    dispatch(userSlice.actions.statusSignUp(Status.loading));

    const result: HttpData<SignUpModel> = await signUpAPI(input);
    console.log('reuslllllll', result);
    if (result.error) {
      dispatch(userSlice.actions.statusSignUp(Status.error));
      dispatch(userSlice.actions.messageSignUp(result?.message));
    } else {
      dispatch(userSlice.actions.signUp(result.data));
      dispatch(userSlice.actions.messageSignUp(result?.message));
    }
  };
export const resetPassAction =
  ({ ...input }: ResetPassDTO): AppThunk =>
  async dispatch => {
    dispatch(userSlice.actions.statusResetPass(Status.loading));

    const result: HttpData<ResetPassModel> = await resetPassAPI(input);
    console.log('reuslllllll', result);
    if (result.error) {
      dispatch(userSlice.actions.statusResetPass(Status.error));
      dispatch(userSlice.actions.messageResetPass(result?.message));
    } else {
      dispatch(userSlice.actions.resetPass(result.data));
      dispatch(userSlice.actions.messageResetPass(result?.message));
    }
  };
export const logoutAction = (): AppThunk => async dispatch => {
  console.log('logoutttt');
  dispatch(userSlice.actions.logout());
};
export const resetStateSignUpAction = (): AppThunk => async dispatch => {
  dispatch(userSlice.actions.resetStateSignUp());
};
export const resetStateResetPassAction = (): AppThunk => async dispatch => {
  dispatch(userSlice.actions.resetStateResetPass());
};
export const { login, signUp } = userSlice.actions;

// export const selectUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
