// store/jobsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: [],
  reducers: {
    setJobs: (state, action) => {
      return action.payload;
    },
  },
});

export const { setJobs } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
