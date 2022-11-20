import {
  ChangePassDTO,
  LoginDTO,
  ResetPassDTO,
  SignUpDTO,
  UpdateInforDTO,
} from '../../dto';
import { HttpData } from '../../helpers/apiHelper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../models/Status';
import {
  ChangePassModel,
  inforUserModel,
  UpdateInforModel,
  UserModel,
} from '../../models';
import { AppThunk } from '../store';
import {
  changePassAPI,
  getInforUser,
  loginAPI,
  resetPassAPI,
  signUpAPI,
  UpdateInforAPI,
} from '../api/userApi';
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
interface InforUserState {
  statusInforUser: Status;
  InforUserData: inforUserModel | undefined;
  messageInforUser: string;
}

const inforUserState: InforUserState = {
  statusInforUser: Status.idle,
  InforUserData: undefined,
  messageInforUser: '',
};
interface ChangePassState {
  statusChangePass: Status;
  changePassData: ChangePassModel | undefined;
  messageChangePass: string;
}

const changePassState: ChangePassState = {
  statusChangePass: Status.idle,
  changePassData: undefined,
  messageChangePass: '',
};
interface UpdateInforState {
  statusUpdateInfor: Status;
  updateInforData: UpdateInforModel | undefined;
  messageUpdateInfor: string;
}

const updateInforState: UpdateInforState = {
  statusUpdateInfor: Status.idle,
  updateInforData: undefined,
  messageUpdateInfor: '',
};
const initialState: LoginState &
  SignUpState &
  ResetPassState &
  InforUserState &
  ChangePassState &
  UpdateInforState = {
  ...loginState,
  ...signUpState,
  ...resetPassState,
  ...inforUserState,
  ...changePassState,
  ...updateInforState,
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
    inforUser: (
      state: InforUserState,
      action: PayloadAction<inforUserModel | undefined>,
    ) => {
      state.InforUserData = action.payload;
      state.statusInforUser = Status.success;
    },
    messageInforUser: (
      state: InforUserState,
      action: PayloadAction<string>,
    ) => {
      state.messageInforUser = action.payload;
    },
    statusInforUser: (state: InforUserState, action: PayloadAction<Status>) => {
      state.statusInforUser = action.payload;
    },
    changePass: (
      state: ChangePassState,
      action: PayloadAction<ChangePassModel | undefined>,
    ) => {
      state.changePassData = action.payload;
      state.statusChangePass = Status.success;
    },
    messageChangePass: (
      state: ChangePassState,
      action: PayloadAction<string>,
    ) => {
      state.messageChangePass = action.payload;
    },
    statusChangePass: (
      state: ChangePassState,
      action: PayloadAction<Status>,
    ) => {
      state.statusChangePass = action.payload;
    },
    resetStateChangePass: state => {
      state.changePassData = undefined;
      state.messageChangePass = '';
      state.statusChangePass = Status.idle;
    },
    updateInfor: (
      state: UpdateInforState,
      action: PayloadAction<UpdateInforModel | undefined>,
    ) => {
      state.updateInforData = action.payload;
      state.statusUpdateInfor = Status.success;
    },
    messageUpdateInfor: (
      state: UpdateInforState,
      action: PayloadAction<string>,
    ) => {
      state.messageUpdateInfor = action.payload;
    },
    statusUpdateInfor: (
      state: UpdateInforState,
      action: PayloadAction<Status>,
    ) => {
      state.statusUpdateInfor = action.payload;
    },
    resetStateUpdateInfor: state => {
      state.updateInforData = undefined;
      state.messageUpdateInfor = '';
      state.statusUpdateInfor = Status.idle;
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
export const ChangePassAction =
  ({ ...input }: ChangePassDTO): AppThunk =>
  async dispatch => {
    dispatch(userSlice.actions.statusChangePass(Status.loading));

    const result: HttpData<ChangePassModel> = await changePassAPI(input);
    console.log('reuslllllll', result);
    if (result.error) {
      dispatch(userSlice.actions.statusChangePass(Status.error));
      dispatch(userSlice.actions.messageChangePass(result?.message));
    } else {
      dispatch(userSlice.actions.changePass(result.data));
      dispatch(userSlice.actions.messageChangePass(result?.message));
    }
  };
export const UpdateInforAction =
  ({ ...input }: UpdateInforDTO): AppThunk =>
  async dispatch => {
    dispatch(userSlice.actions.statusUpdateInfor(Status.loading));

    const result: HttpData<UpdateInforModel> = await UpdateInforAPI(input);
    console.log('reuslllllll', result);
    if (result.error) {
      dispatch(userSlice.actions.statusUpdateInfor(Status.error));
      dispatch(userSlice.actions.messageUpdateInfor(result?.message));
    } else {
      dispatch(userSlice.actions.updateInfor(result.data));
      dispatch(userSlice.actions.messageUpdateInfor(result?.message));
    }
  };
export const getInforAction = (): AppThunk => async dispatch => {
  dispatch(userSlice.actions.statusInforUser(Status.loading));

  const result: HttpData<inforUserModel> = await getInforUser();

  if (result.error) {
    dispatch(userSlice.actions.statusInforUser(Status.error));
    dispatch(userSlice.actions.messageInforUser(result?.message));
  } else {
    dispatch(userSlice.actions.inforUser(result.data));
    dispatch(userSlice.actions.messageInforUser(result?.message));
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
export const resetStateChangePassAction = (): AppThunk => async dispatch => {
  dispatch(userSlice.actions.resetStateChangePass());
};
export const resetStateUpdateInforAction = (): AppThunk => async dispatch => {
  dispatch(userSlice.actions.resetStateUpdateInfor());
};
export const { login, signUp, inforUser, resetPass, updateInfor } =
  userSlice.actions;

// export const selectUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
