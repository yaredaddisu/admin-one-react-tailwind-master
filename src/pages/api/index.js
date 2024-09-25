import { createUser, getAllUsers, updateUser, getUserById, deleteUserById } from './models/users';

export default async function handler(req, res) {
    if (req.method === 'POST') {
    try {
      const users = await createUser(req.body);
      
      console.log(req.body);

      if (users.success) {
        res.status(200).json(users);
      } else {
        res.status(500).json(users);
      }
    } catch (error) {
      console.error('Unhandled error: ', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
  }