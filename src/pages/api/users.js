// // pages/api/users.js
// import db from '../../lib/db'; // Adjust according to your database setup
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   // Handle POST request to register a new user
//   if (req.method === 'POST') {
//     try {
//       const {
//         firstName,
//         lastName,
//         email,
//         phone,
//         password,
//         chat_id,
//         username,
//         role,
//         status,
//         availability,
//       } = req.body;

//       // Log the incoming request body
//       // console.log(req.body);

//       // Validate required fields (simple example)
//       if (!firstName || !lastName || !email || !phone || !password || !username) {
//         return res.status(400).json({ message: 'Missing required fields' });
//       }

//       // Hash the password before storing it
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Check for undefined values
//       const params = [
//         firstName,
//         lastName,
//         email,
//         phone,
//         hashedPassword,
//         chat_id,
//         username,
//         role,
//         status,
//         availability,
//       ];

//       params.forEach((param, index) => {
//         if (param === undefined) {
//           console.log(`Parameter ${index} is undefined`);
//         }
//       });
      
//       // Insert the user into the database using the pool
//       const result = await db.execute(
//         'INSERT INTO users (firstName, lastName, email, phone, password, chat_id, username, role, status, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [
//           firstName || null,
//           lastName || null,
//           email || null,
//           phone || null,
//           hashedPassword,
//           chat_id || null,
//           username || null,
//           role || null,
//           status || null,
//           availability || null,
//         ]
//       );

//       res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
//     } catch (error) {
//       console.error('Database query error:', error); // Log the error for debugging
//       res.status(500).json({ message: 'Error registering user', error: error.message });
//     }
//   }
//   // Handle GET request to retrieve all users
//   if (req.method === 'GET') {
//     try {
//       // Query to get all users from the database
//       const [users] = await db.execute('SELECT * FROM users');
//       console.log(users)
//       res.status(200).json(users);
//     } catch (error) {
//       console.error('Database query error:', error); // Log the error for debugging
//       res.status(500).json({ message: 'Error retrieving users', error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST', 'GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
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


if (req.method === 'GET') {
  const { PageNumber = 1, PageSize = 100, SearchTerm = '' } = req.query;

  const pageNumber = parseInt(PageNumber, 10);
  const pageSize = parseInt(PageSize, 10);
  const searchTerm = `%${SearchTerm}%`;

  try {
    const results = await getAllUsers(pageNumber, pageSize, searchTerm);
    
    // Send results in the desired format: data.data
    res.status(200).json({
      success: true,  // optional success indicator
     
        data: results  // Wrap results in a data object as an array
    
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}


 
  if (req.method === 'PUT') {
  
   // Assuming you are using query params for the user ID (Next.js)
    const updatedData = req.body;
    const userId = updatedData.id; 
   console.log(userId);
    try {
      // Assuming `updateUser` is an async function that updates the user and returns the updated record.
      const updatedUser = await updateUser(userId, updatedData);

      if (updatedUser) {
        // Send the updated user in the requested format: data.data
        res.status(200).json({
          success: true,
          data: {
            data: updatedUser // Return the updated user data
          }
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the user: ' + err.message
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
 



  }

 

