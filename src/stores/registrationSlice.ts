import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../interfaces';

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (user: Omit<User, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users', user);
      return response.data; // Assuming the response contains the user data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetRegistration: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;
