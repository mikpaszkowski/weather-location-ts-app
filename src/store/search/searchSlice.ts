import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootStore';

export interface ISearch {
	searchAnimation: boolean;
	errorMessage: string;
	isLoading: boolean;
}

export const initialState: ISearch = {
	searchAnimation: false,
	isLoading: false,
	errorMessage: '',
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchInfo: (state, { payload }: PayloadAction<ISearch>) => payload,
	},
});

export const { setSearchInfo } = searchSlice.actions;
export const selectSearchRunning = (state: RootState) =>
	state.searchInfo.searchAnimation;
export const selectIsLoading = (state: RootState) =>
	state.searchInfo.isLoading;
export const selectErrorMessage = (state: RootState) =>
	state.searchInfo.errorMessage;
export default searchSlice.reducer;
