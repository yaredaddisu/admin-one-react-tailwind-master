import { useRouter } from 'next/router';
import { useStateContext } from '../contexts/contextprovider'; // Adjust the path as needed
import axiosClient from '../axiosClient'; // Import your Axios client

const LogoutButton = ({ children }) => {
  const { setUser, setToken } = useStateContext(); // Get context methods
  const router = useRouter(); // Get Next.js router

  const logout = async () => {
    try {
      // Make an Axios request to the server to log the user out
      axiosClient.get('/logout')
            .then(() => {
                setUser(null);
                setToken(null);
            });
      // Clear token from localStorage
      localStorage.removeItem('ACCESS_TOKEN');

      // Redirect to the login page
      // router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Optionally handle errors
    }
  };

  return (
    <button onClick={logout}  >
      {children}
    </button>
  );
};

export default LogoutButton;
