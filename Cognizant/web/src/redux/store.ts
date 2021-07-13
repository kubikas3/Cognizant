import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import challengeReducer from '../redux/actions/challengeSlice';

export const store = configureStore({
  reducer: {
    challenge: challengeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
