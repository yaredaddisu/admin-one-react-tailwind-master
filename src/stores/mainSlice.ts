import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPayloadObject } from '../interfaces'

class MainState {
  userName: string = ''
  userEmail: string | null = null
  userToken: string = ''
  isFieldFocusRegistered: boolean = false
}

const getInitialState = (): MainState => {
  if (typeof window !== 'undefined') {
 
    return {
      userName: localStorage.getItem('firstName') || '',
      userEmail: localStorage.getItem('email'),
      userToken: localStorage.getItem('token') || '',
      isFieldFocusRegistered: false,
    };
  }

  // Default state for server-side rendering
  return {
    userName: ' ',
    userEmail: null,
    userToken: '',
    isFieldFocusRegistered: false,
  };
};

const initialState: MainState = getInitialState();

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
    },
    setToken: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userToken = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken } = mainSlice.actions;

export default mainSlice.reducer;
