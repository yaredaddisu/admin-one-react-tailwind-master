import { useRouter } from 'next/router';
import axios from 'axios';
import { useAppDispatch } from '../stores/hooks'; // Import your custom hook for dispatch
import { setUser } from '../stores/mainSlice'; // Import the setUser action

const LogoutButton = ({ children }) => {
  const router = useRouter(); // Get Next.js router
  const dispatch = useAppDispatch(); // Initialize dispatch

  const logout = async () => {
    try {
      // Make an Axios request to the API route for logging out
      const response = await axios.get('/api/logout');

      // Check if logout was successful
      if (response.status === 200) {
        // Clear user data from the state
        dispatch(setUser({
          name: '', email: '',
          token: ''
        })); // Reset user state
        // Clear token from localStorage
        localStorage.removeItem('token');
        
        // Redirect to the login page
        router.push('/login');
      } else {
        console.error('Logout failed', response.data);
      }
    } catch (error) {
      console.error('Logout failed', error);
      // Optionally handle errors (e.g., show a notification)
    }
  };

  return (
    <button onClick={logout} className="logout-button">
      {children}
    </button>
  );
};

export default LogoutButton;
