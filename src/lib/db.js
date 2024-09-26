// // src/lib/db.js
// import mysql from 'mysql2/promise';

// const dbConfig = {
//   host: 'localhost', // Replace with your database host
//   user: 'root',      // Replace with your database user
//   // password: 'password', // Replace with your database password
//   database: 'technician_management', // Replace with your database name
// };

// let connection;

// export async function connectToDatabase() {
//   if (!connection) {
//     try {
//       connection = await mysql.createConnection(dbConfig);
//       console.log('Database connection successful');
//     } catch (error) {
//       console.error('Database connection failed:', error);
//       throw error;
//     }
//   }
//   return connection;
// }

// export default connectToDatabase;
// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', // e.g., 'localhost'
  user: 'root', // e.g., 'root'
  // password: 'your-database-password', // your database password
  database: 'technician_management', // your database name
});

// const pool = mysql.createPool({
//   host: '109.70.148.47',
//   user: 'lomisttx_user', // Replace with your MySQL username
//   password: 'Yared@1997', // Add a comma here
//   database: 'lomisttx_technician_management' // Replace with your database name
// });

export default pool;  
