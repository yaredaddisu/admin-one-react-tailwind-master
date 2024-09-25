// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { UserPayloadObject } from '../interfaces'

// interface MainState {
//   userName: string
//   userEmail: null | string
//   isFieldFocusRegistered: boolean
// }

// const initialState: MainState = {
//   /* User */
//   userName: 'John Doe',
//   userEmail: 'doe.doe.doe@example.com',

//   /* Field focus with ctrl+k (to register only once) */
//   isFieldFocusRegistered: false,
// }

// export const mainSlice = createSlice({
//   name: 'main',
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<UserPayloadObject>) => {
//       state.userName = action.payload.name
//       state.userEmail = action.payload.email
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { setUser } = mainSlice.actions

// export default mainSlice.reducer
// src/store/mainSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPayloadObject } from '../interfaces';

interface MainState {
  userName: string | null;
  userEmail: string | null;
  isFieldFocusRegistered: boolean;
}

const initialState: MainState = {
  userName: null,
  userEmail: null,
  isFieldFocusRegistered: false,
};

// Create the main slice
export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;

      // Save the user to localStorage
      if (typeof window !== 'undefined') { // Check if in client environment
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    clearUser: (state) => {
      state.userName = null;
      state.userEmail = null;

      // Clear user from localStorage
      if (typeof window !== 'undefined') { // Check if in client environment
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setUser, clearUser } = mainSlice.actions;

export default mainSlice.reducer;

// Function to get user from localStorage
export const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') { // Check if in client environment
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null; // Return null if not in client environment
};
