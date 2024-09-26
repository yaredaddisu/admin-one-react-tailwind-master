// File: pages/api/users/[id].js
 import {  getUserById  } from '../models/users';
  
export default async function handler(req, res) {
 
        const { id } = req.query;
       console.log(id)
        try {
          // Assuming `getUserById` is a function that fetches the user by ID
          const data = await getUserById(id);
      
          if (data) {
            // Return the user in the requested format: data.data
            res.status(200).json(data);
          } else {
            res.status(404).json({
              success: false,
              message: 'User not found'
            });
          }
        } catch (err) {
          res.status(500).json({
            success: false,
            message: err.message
          });
        }
  
  }
  