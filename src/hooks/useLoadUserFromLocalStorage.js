// src/hooks/useLoadUserFromLocalStorage.ts
import { useEffect } from 'react';
import { useAppDispatch } from '../stores/hooks'; // Typed hooks
import { setUser } from '../stores/mainSlice'; // Redux slice

const useLoadUserFromLocalStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData); // Parse the JSON string into an object
    console.log(userData)
      // Dispatch the action to update the Redux store
      dispatch(setUser({ name: user.name, email: user.email }));
    }
  }, [dispatch]);
};

export default useLoadUserFromLocalStorage;
