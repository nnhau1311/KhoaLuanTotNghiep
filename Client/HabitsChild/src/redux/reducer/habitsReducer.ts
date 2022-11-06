import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddHabitsDTO } from '../../dto';
import { HttpData } from '../../helpers/apiHelper';
import {
  AddHabitsModel,
  ListHabits,
  ListHabitsManager,
  Status,
} from '../../models';
import {
  addHabitsAPI,
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
const initialState: ListHabitsState & ListHabitsManagerState & AddHabitsState =
  {
    ...listHabitsState,
    ...listHabitsManagerState,
    ...addHabitsState,
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
  },
});
export const getListHabitsAction = (): AppThunk => async dispatch => {
  dispatch(habitsSlice.actions.statusHabits(Status.loading));

  const result: HttpData<ListHabits> = await getListHabits();
  console.log('resultt', result);
  if (result.error) {
    dispatch(habitsSlice.actions.statusHabits(Status.error));
    dispatch(habitsSlice.actions.messageHabits(result?.message));
  } else {
    dispatch(habitsSlice.actions.listHabits(result.data));
    dispatch(habitsSlice.actions.messageHabits(result?.message));
  }
};
export const getListHabitsManagerAction = (): AppThunk => async dispatch => {
  dispatch(habitsSlice.actions.statusHabitsManager(Status.loading));

  const result: HttpData<ListHabitsManager> = await getListHabitsManager();
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
export const resetStateAddHabits = (): AppThunk => async dispatch => {
  dispatch(habitsSlice.actions.resetStateAddHabits());
};
export const { listHabits, listHabitsManager, addHabits } = habitsSlice.actions;
export default habitsSlice.reducer;
