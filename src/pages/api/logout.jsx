// src/pages/api/logout.ts
// import type { NextApiRequest, NextApiResponse } from 'next';

export default async function logout(req, res) {
  if (req.method === 'GET') {
    // Logic to handle user logout (e.g., invalidate session, clear cookies, etc.)
    
    // If you're using cookies or sessions, clear them here
    // e.g., res.setHeader('Set-Cookie', 'token=; Max-Age=0; path=/');

    // Send success response
    return res.status(200).json({ message: 'Logged out successfully' });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
