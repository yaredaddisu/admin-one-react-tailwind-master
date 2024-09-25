import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,  setError] = useState('');
  const router = useRouter();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token); // Store the token
        router.push('/dashboard'); // Redirect to a protected page
      } else {
        const errorData = await res.json();
        setError(errorData.message); // Set error to the error message string
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white"
         
      >
      Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  </div>
  );
}
