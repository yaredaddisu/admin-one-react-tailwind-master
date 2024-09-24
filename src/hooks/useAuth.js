// hooks/useAuth.js
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const useAuth = () => {
  const { token } = useSelector((state) => state.user);
  const router = useRouter();

  if (!token) {
    router.push('/login'); // Redirect to login if not authenticated
  }

  return token;
};

export default useAuth;
