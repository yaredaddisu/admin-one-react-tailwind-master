// pages/dashboard.js
import { getSession } from 'next-auth/react';

export default function Dashboard() {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
