import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../models';
import { AppThunk } from '../store';

interface IndexCourseState {
  index?: number;
}

const indexCourseState: IndexCourseState = {
  index: 0,
};
const initialState: IndexCourseState = {
  ...indexCourseState,
};
export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    indexCourse: (
      state: IndexCourseState,
      action: PayloadAction<IndexCourseState | undefined>,
    ) => {
      state.index = action.payload?.index;
    },
  },
});
export const setIndexCourse =
  (input: IndexCourseState): AppThunk =>
  async dispatch => {
    dispatch(courseSlice.actions.indexCourse(input));
  };
export const { indexCourse } = courseSlice.actions;
export default courseSlice.reducer;
