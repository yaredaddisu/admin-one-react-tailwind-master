// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { jobsReducer } from './jobsSlice';  // Example of a slice

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export default store;
