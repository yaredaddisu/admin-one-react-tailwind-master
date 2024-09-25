// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action for logging in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action for registering a user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users', userData);
      return response.data; // You can return the user or any relevant data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action for updating a user
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users', userData);
      return response.data; // You can return the user or any relevant data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action for getting all users
export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users');
      return response.data; // Return the list of users
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

getAllUsers()

// Async action for logging out a user
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  // Optional: You can implement an API call here if needed
  return true; 
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    users: [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1 (123) 456-7890",
        "username": "johndoe",
        "role": "1",
        "status": "1",
        "availability": "1"
      },
      {
        "id": 2,
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@example.com",
        "phone": "+1 (987) 654-3210",
        "username": "janesmith",
        "role": "2",
        "status": "1",
        "availability": "1"
      }
    ]
    , 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle login actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle registration actions
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true; // Optionally authenticate the user upon registration
        state.user = action.payload.user; // Set user info from the response
        state.token = action.payload.token; // Set token if provided
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetching all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Set the list of users in the state
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle logout actions
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;



// // src/store/authSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Define an interface for the user data
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// // Define the initial state interface
// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
//   users: User[]; // List of users
// }

// // Define the initial state
// const initialState: AuthState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
//   users: [],
// };

// // Async action for logging in a user
// export const loginUser = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
//   'auth/loginUser',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/api/login', credentials);
//       return response.data; // Assuming response.data has the user and token
//     } catch (error) {
//       return rejectWithValue(error.response.data.message); // Adjust error handling as needed
//     }
//   }
// );

// // Async action for registering a user
// export const registerUser = createAsyncThunk<User, { name: string; email: string; password: string }, { rejectValue: string }>(
//   'auth/registerUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/api/users', userData);
//       return response.data; // You can return the user or any relevant data
//     } catch (error) {
//       return rejectWithValue(error.response.data.message); // Adjust error handling as needed
//     }
//   }
// );

// // Async action for updating a user
// export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>(
//   'auth/updateUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`/api/users/${userData.id}`, userData);
//       return response.data; // You can return the user or any relevant data
//     } catch (error) {
//       return rejectWithValue(error.response.data.message); // Adjust error handling as needed
//     }
//   }
// );

// // Async action for getting all users
// export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
//   'auth/getAllUsers',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('/api/users');
//       return response.data; // Return the list of users
//     } catch (error) {
//       return rejectWithValue(error.response.data.message); // Adjust error handling as needed
//     }
//   }
// );

// // Async action for logging out a user
// export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
//   // Optional: You can implement an API call here if needed
//   return true; 
// });

// // Create the auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Handle login actions
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle registration actions
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
//         state.loading = false;
//         state.isAuthenticated = true; // Optionally authenticate the user upon registration
//         state.user = action.payload.user; // Set user info from the response
//         state.token = action.payload.token; // Set token if provided
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle fetching all users
//       .addCase(getAllUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
//         state.loading = false;
//         state.users = action.payload; // Set the list of users in the state
//       })
//       .addCase(getAllUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle logout actions
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.token = null;
//       });
//   },
// });

// export default authSlice.reducer;
