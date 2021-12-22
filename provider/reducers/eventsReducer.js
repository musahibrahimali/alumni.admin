import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: [],
};

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        getEvents: (state, action) => {
            state.events = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getEvents } = eventSlice.actions;

export default eventSlice.reducer;