import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiResponse, ResultInfo, SolutionError, SolutionInfo } from '../../types';
import API from '../../utils/API';
import { RootState } from '../store';

export interface ChallengeState {
	results: ResultInfo[];
	lastResult: ResultInfo | undefined;
	status: 'idle' | 'loading' | 'failed';
	error: SolutionError | undefined;
};

const initialState: ChallengeState = {
	results: [],
	lastResult: undefined,
	status: 'idle',
	error: undefined
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const submitTaskAsync = createAsyncThunk<ApiResponse<ResultInfo>, SolutionInfo, { rejectValue: SolutionError }>(
	'challenge/submitTask',
	async (solution: SolutionInfo, { rejectWithValue }) => {
		let error: SolutionError = { 
			message: 'Validation error occured.'
		};
		
		if (solution.name.length === 0) {
			error.validationErrors = { ...error.validationErrors, name: 'This one is required.' };
		}

		if (solution.script.length === 0) {
			error.validationErrors = { ...error.validationErrors, script: 'This one is required.' };
		}

		if (error.validationErrors) {
			return rejectWithValue(error);
		}

		try {
			const response = await API.post<SolutionInfo, ApiResponse<ResultInfo>>('challenge/submitTask', solution);
			return response;
		} catch (err) {
			return rejectWithValue(err.response.data.error);
		}
	}
);

export const challengeSlice = createSlice({
	name: 'challenge',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		//   state.value += action.payload;
		// },
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(submitTaskAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(submitTaskAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.results = [...state.results, action.payload.result];
				state.lastResult = action.payload.result;
				state.error = undefined;
			})
			.addCase(submitTaskAsync.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

// export const { } = challengeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectResults = (state: RootState) => state.challenge.results;
export default challengeSlice.reducer;