import { createSlice } from '@reduxjs/toolkit';

export interface ISearch {
	searchRunning: boolean;
	searchError: boolean;
}

export const initialState: ISearch = {
	searchRunning: false,
	searchError: false,
};

// export const searchSlice = createSlice({
// 	name: 'search',
// 	initialState,
// });
