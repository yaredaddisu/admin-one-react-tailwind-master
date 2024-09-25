// src/pages/api/login.js
import db from '../../lib/db'; // Adjust according to your database setup
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Import bcryptjs

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
       

      // Select the user by email
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      // If user not found, return an error
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = rows[0];
//console.log(user)
      // Check the password using bcryptjs
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create a JWT token with the user's ID and email
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        SECRET_KEY,
        { expiresIn: '1h' } // Token will expire in 1 hour
      );

      res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.firstName } });

    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
