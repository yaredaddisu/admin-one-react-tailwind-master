// import { configureStore } from '@reduxjs/toolkit'
// import darkModeReducer from './darkModeSlice'
// import mainReducer from './mainSlice'

// export const store = configureStore({
//   reducer: {
//     darkMode: darkModeReducer,
//     main: mainReducer,
//   },
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../stores/registrationSlice';
import userReducer from '../store/authSlice';
import darkModeReducer from './darkModeSlice'
import mainReducer from './mainSlice'

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    user: userReducer,
    darkMode: darkModeReducer,
    main: mainReducer,
  },
});

// Properly typed dispatch for async thunks
export type AppDispatch = typeof store.dispatch;
