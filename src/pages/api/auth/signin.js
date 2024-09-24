// pages/auth/signin.js
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    const res = await signIn('credentials', {
      redirect: false,
      username: username.value,
      password: password.value,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Sign in</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
