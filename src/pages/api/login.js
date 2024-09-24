// pages/api/login.js
import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await axios.post('YOUR_AUTH_SERVER_URL', { email, password });
      // Save the token and user data in cookies or session storage if needed
      res.status(200).json(response.data);
    } catch (error) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
