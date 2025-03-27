import "dotenv/config";

import { faker } from "@faker-js/faker";
import pool from "./config/db.js";

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.person.fullName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

const users = [];
const insertData = async () => {
  const query = `INSERT INTO users (id,name,email,password) VALUES ?`;
  for (let i = 0; i < 1000; i++) {
    users.push(getRandomUser());
  }
  try {
    await pool.query(query, [users]);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end(); // Close all connections
  }
};

// async () => {
//   await insertData();
//   process.exit();
// };

await insertData();

// try {
//   const [err, results, fields] = await connection.query(
//     "CREATE TABLE IF NOT EXISTS user (id VARCHAR(50) PRIMARY KEY, username VARCHAR(50) UNIQUE, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(50) NOT NULL)"
//   );

//   console.log("Result", results); // results contains rows returned by server
// } catch (error) {
//   console.log("catch", error);
// }

// try {
//   const [err, results, fields] = await connection.query(
//     "INSERT INTO user VALUES (?,?,?,?)",
//     getRandomUser()
//   );
//   if (err) {
//     throw err;
//   }
//   console.log(err);
//   console.log(results); // results contains rows returned by server
// } catch (error) {
//   console.log(error);
// }

// let users = [];

// for (let i = 0; i < 100; i++) {
//   users.push(getRandomUser());
// }

// try {
//   const [results] = await connection.query("INSERT INTO user VALUES ?", [
//     users,
//   ]);
//   console.log(results); // results contains rows returned by server
// } catch (error) {
//   console.log(error);
// }
