import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import courseReducer from './reducer/courseReducer';
import habitsReducer from './reducer/habitsReducer';
import userReducer from './reducer/userReducer';
// import categoryReducer from './reducers/categorySlice';
// import newsReducer from './reducers/newsSlice';
// import reportReducer from './reducers/reportSlice';

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    habitsReducer: habitsReducer,
    courseReducer: courseReducer,
    // category: categoryReducer,
    // news: newsReducer,
    // report: reportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
