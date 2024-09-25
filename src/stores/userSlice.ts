// userSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../interfaces';
 
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/users/${user.id}`, user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ... rest of the slice
