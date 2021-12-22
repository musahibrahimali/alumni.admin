import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: [],
};

export const eventSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        getJobs: (state, action) => {
            state.jobs = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getJobs } = eventSlice.actions;

export default eventSlice.reducer;