import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddHabitsDTO,
  CheckInHabitDTO,
  DeleteHabitDTO,
  HabitDetailDTO,
  ListHabitsDTO,
  ListHabitsManagerDTO,
} from '../../dto';
import { HttpData } from '../../helpers/apiHelper';
import {
  AddHabitsModel,
  CheckInHabitModel,
  DeleteHabitModel,
  HabitDetailModel,
  ListHabits,
  ListHabitsManager,
  Status,
} from '../../models';
import {
  addHabitsAPI,
  checkInHabitsAPI,
  deleteHabitsAPI,
  detailHabitsAPI,
  getListHabits,
  getListHabitsManager,
} from '../api/habitsApi';
import { AppThunk } from '../store';

interface ListHabitsState {
  statusListHabits: Status;
  listHabitsData: ListHabits | undefined;
  messageListHabits: string;
}

const listHabitsState: ListHabitsState = {
  statusListHabits: Status.idle,
  listHabitsData: undefined,
  messageListHabits: '',
};
interface ListHabitsManagerState {
  statusListHabitsManager: Status;
  listHabitsDataManager: ListHabitsManager | undefined;
  messageListHabitsManager: string;
}

const listHabitsManagerState: ListHabitsManagerState = {
  statusListHabitsManager: Status.idle,
  listHabitsDataManager: undefined,
  messageListHabitsManager: '',
};
interface AddHabitsState {
  statusAddHabits: Status;
  addHabitsData: AddHabitsModel | undefined;
  messageAddHabits: string;
}

const addHabitsState: AddHabitsState = {
  statusAddHabits: Status.idle,
  addHabitsData: undefined,
  messageAddHabits: '',
};
interface DeleteHabitState {
  statusDeleteHabits: Status;
  deleteHabitData: DeleteHabitModel | undefined;
  messageDeleteHabits: string;
}

const deleteHabitState: DeleteHabitState = {
  statusDeleteHabits: Status.idle,
  deleteHabitData: undefined,
  messageDeleteHabits: '',
};
interface DetailHabitsState {
  statusDetailHabits: Status;
  detailHabitsData: HabitDetailModel | undefined;
  messageDetailHabits: string;
}

const detailHabitsState: DetailHabitsState = {
  statusDetailHabits: Status.idle,
  detailHabitsData: undefined,
  messageDetailHabits: '',
};
interface CheckInHabitState {
  statusCheckInHabit: Status;
  checkInHabitsData: CheckInHabitModel | undefined;
  messageCheckInHabit: string;
}

const checkInHabitsState: CheckInHabitState = {
  statusCheckInHabit: Status.idle,
  checkInHabitsData: undefined,
  messageCheckInHabit: '',
};
const initialState: ListHabitsState &
  ListHabitsManagerState &
  AddHabitsState &
  DetailHabitsState &
  DeleteHabitState &
  CheckInHabitState = {
  ...listHabitsState,
  ...listHabitsManagerState,
  ...addHabitsState,
  ...detailHabitsState,
  ...deleteHabitState,
  ...checkInHabitsState,
};
export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    listHabits: (
      state: ListHabitsState,
      action: PayloadAction<ListHabits | undefined>,
    ) => {
      state.listHabitsData = action.payload;
      state.statusListHabits = Status.success;
    },
    messageHabits: (state: ListHabitsState, action: PayloadAction<string>) => {
      state.messageListHabits = action.payload;
    },
    statusHabits: (state: ListHabitsState, action: PayloadAction<Status>) => {
      state.statusListHabits = action.payload;
    },
    listHabitsManager: (
      state: ListHabitsManagerState,
      action: PayloadAction<ListHabitsManager | undefined>,
    ) => {
      state.listHabitsDataManager = action.payload;
      state.statusListHabitsManager = Status.success;
    },
    messageHabitsManager: (
      state: ListHabitsManagerState,
      action: PayloadAction<string>,
    ) => {
      state.messageListHabitsManager = action.payload;
    },
    statusHabitsManager: (
      state: ListHabitsManagerState,
      action: PayloadAction<Status>,
    ) => {
      state.statusListHabitsManager = action.payload;
    },
    addHabits: (
      state: AddHabitsState,
      action: PayloadAction<AddHabitsModel | undefined>,
    ) => {
      state.addHabitsData = action.payload;
      state.statusAddHabits = Status.success;
    },
    messageAddHabits: (
      state: AddHabitsState,
      action: PayloadAction<string>,
    ) => {
      state.messageAddHabits = action.payload;
    },
    statusAddHaits: (state: AddHabitsState, action: PayloadAction<Status>) => {
      state.statusAddHabits = action.payload;
    },
    resetStateAddHabits: state => {
      (state.addHabitsData = undefined),
        (state.messageAddHabits = ''),
        (state.statusAddHabits = Status.idle);
    },
    deleteHabit: (
      state: DeleteHabitState,
      action: PayloadAction<DeleteHabitModel | undefined>,
    ) => {
      state.deleteHabitData = action.payload;
      state.statusDeleteHabits = Status.success;
    },
    messageDeleteHabit: (
      state: DeleteHabitState,
      action: PayloadAction<string>,
    ) => {
      state.messageDeleteHabits = action.payload;
    },
    statusDeleteHabit: (
      state: DeleteHabitState,
      action: PayloadAction<Status>,
    ) => {
      state.statusDeleteHabits = action.payload;
    },
    resetStateDeleteHabit: state => {
      (state.deleteHabitData = undefined),
        (state.messageDeleteHabits = ''),
        (state.statusDeleteHabits = Status.idle);
    },
    detailHabits: (
      state: DetailHabitsState,
      action: PayloadAction<HabitDetailModel | undefined>,
    ) => {
      state.detailHabitsData = action.payload;
      state.statusDetailHabits = Status.success;
    },
    messageDetailHabits: (
      state: DetailHabitsState,
      action: PayloadAction<string>,
    ) => {
      state.messageDetailHabits = action.payload;
    },
    statusDetailHabits: (
      state: DetailHabitsState,
      action: PayloadAction<Status>,
    ) => {
      state.statusDetailHabits = action.payload;
    },
    resetStateDetailHabit: state => {
      (state.detailHabitsData = undefined),
        (state.messageDetailHabits = ''),
        (state.statusDetailHabits = Status.idle);
    },
    checkInHabit: (
      state: CheckInHabitState,
      action: PayloadAction<CheckInHabitModel | undefined>,
    ) => {
      state.checkInHabitsData = action.payload;
      state.statusCheckInHabit = Status.success;
    },
    messageCheckInHabits: (
      state: CheckInHabitState,
      action: PayloadAction<string>,
    ) => {
      state.messageCheckInHabit = action.payload;
    },
    statusCheckInHabits: (
      state: CheckInHabitState,
      action: PayloadAction<Status>,
    ) => {
      state.statusCheckInHabit = action.payload;
    },
    resetStateCheckInHabit: state => {
      (state.checkInHabitsData = undefined),
        (state.messageCheckInHabit = ''),
        (state.statusCheckInHabit = Status.idle);
    },
  },
});
export const getListHabitsAction =
  ({ ...input }: ListHabitsDTO): AppThunk =>
  async dispatch => {
    dispatch(habitsSlice.actions.statusHabits(Status.loading));

    const result: HttpData<ListHabits> = await getListHabits(input);
    // console.log('resulttinput', result.data?.Data.content);
    if (result.error) {
      dispatch(habitsSlice.actions.statusHabits(Status.error));
      dispatch(habitsSlice.actions.messageHabits(result?.message));
    } else {
      dispatch(habitsSlice.actions.listHabits(result.data));
      dispatch(habitsSlice.actions.messageHabits(result?.message));
    }
  };
export const getListHabitsManagerAction =
  ({ ...input }: ListHabitsManagerDTO): AppThunk =>
  async dispatch => {
    dispatch(habitsSlice.actions.statusHabitsManager(Status.loading));

    const result: HttpData<ListHabitsManager> = await getListHabitsManager(
      input,
    );
    console.log('resultt', result);
    if (result.error) {
      dispatch(habitsSlice.actions.statusHabitsManager(Status.error));
      dispatch(habitsSlice.actions.messageHabitsManager(result?.message));
    } else {
      dispatch(habitsSlice.actions.listHabitsManager(result.data));
      dispatch(habitsSlice.actions.messageHabits(result?.message));
    }
  };
export const addHabitsAction =
  ({ ...input }: AddHabitsDTO): AppThunk =>
  async dispatch => {
    dispatch(habitsSlice.actions.statusAddHaits(Status.loading));

    const result: HttpData<AddHabitsModel> = await addHabitsAPI(input);
    console.log('resultt', result);
    if (result.error) {
      dispatch(habitsSlice.actions.statusAddHaits(Status.error));
      dispatch(habitsSlice.actions.messageAddHabits(result?.message));
    } else {
      dispatch(habitsSlice.actions.addHabits(result.data));
      dispatch(habitsSlice.actions.messageAddHabits(result?.message));
    }
  };
export const deleteHabitAction =
  ({ ...input }: DeleteHabitDTO): AppThunk =>
  async dispatch => {
    dispatch(habitsSlice.actions.statusDeleteHabit(Status.loading));

    const result: HttpData<DeleteHabitModel> = await deleteHabitsAPI(input);
    console.log('resultt', result);
    if (result.error) {
      dispatch(habitsSlice.actions.statusDeleteHabit(Status.error));
      dispatch(habitsSlice.actions.messageDeleteHabit(result?.message));
    } else {
      dispatch(habitsSlice.actions.deleteHabit(result.data));
      dispatch(habitsSlice.actions.messageDeleteHabit(result?.message));
    }
  };
export const getDetailHabitsAction =
  ({ ...input }: HabitDetailDTO): AppThunk =>
  async dispatch => {
    dispatch(habitsSlice.actions.statusDetailHabits(Status.loading));

    const result: HttpData<HabitDetailModel> = await detailHabitsAPI(input);

    if (result.error) {
      dispatch(habitsSlice.actions.statusDetailHabits(Status.error));
      dispatch(habitsSlice.actions.messageDetailHabits(result?.message));
    } else {
      dispatch(habitsSlice.actions.detailHabits(result.data));
      dispatch(habitsSlice.actions.messageDetailHabits(result?.message));
    }
  };
export const CheckInHabitAction =
  ({ ...input }: CheckInHabitDTO): AppThunk =>
  async dispatch => {
    dispatch(habitsSlice.actions.statusCheckInHabits(Status.loading));
    console.log('inputttttttt', input);
    const result: HttpData<CheckInHabitModel> = await checkInHabitsAPI(input);
    console.log('resultt', result);
    if (result.error) {
      dispatch(habitsSlice.actions.statusCheckInHabits(Status.error));
      dispatch(habitsSlice.actions.messageCheckInHabits(result?.message));
    } else {
      dispatch(habitsSlice.actions.checkInHabit(result.data));
      dispatch(habitsSlice.actions.messageCheckInHabits(result?.message));
    }
  };
export const resetStateAddHabits = (): AppThunk => async dispatch => {
  dispatch(habitsSlice.actions.resetStateAddHabits());
};
export const resetStateDeleteHabit = (): AppThunk => async dispatch => {
  dispatch(habitsSlice.actions.resetStateDeleteHabit());
};
export const resetStateCheckInHabit = (): AppThunk => async dispatch => {
  dispatch(habitsSlice.actions.resetStateCheckInHabit());
};
export const resetStateDetailHabit = (): AppThunk => async dispatch => {
  dispatch(habitsSlice.actions.resetStateDetailHabit());
};
export const {
  listHabits,
  listHabitsManager,
  addHabits,
  detailHabits,
  deleteHabit,
  checkInHabit,
} = habitsSlice.actions;
export default habitsSlice.reducer;
