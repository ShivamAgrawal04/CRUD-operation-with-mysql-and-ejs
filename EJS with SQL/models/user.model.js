import pool from "../config/db.js";

// id INT AUTO_INCREMENT PRIMARY KEY

export const createUserTableDB = async () => {
  const query = `CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_email (email)
    )`;
  await pool.execute(query);
  console.log("User table created or already exists.");
};

export const createUserDB = async (id, name, email, password) => {
  const query = "INSERT INTO users (id,name,email,password) VALUES (?,?,?,?)";
  const [results] = await pool.execute(query, [id, name, email, password]);
  return results;
};

export const getAllUsersDB = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const query = `SELECT id,name,email,created_at FROM users LIMIT ${limit} OFFSET ${offset}`;
  const [results] = await pool.execute(query);
  return results;
};

export const getUserByIdDB = async (id) => {
  const query = "SELECT * FROM users WHERE id = ?";
  const [results] = await pool.execute(query, [id]);
  return results;
};

export const getUserByEmailDB = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [results] = await pool.execute(query, [email]);
  return results;
};

export const updateUserByIdDB = async (user) => {
  const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
  const [results] = await pool.execute(query, [
    user.name,
    user.email,
    user.password,
    user.id,
  ]);
  return results;
};

export const deleteUserByIdDB = async (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  const [results] = await pool.execute(query, [id]);
  return results;
};

export const getTotalUserCountDB = async () => {
  const query = "SELECT COUNT(*) as total FROM users";
  const [results] = await pool.execute(query);
  return results[0].total;
};

export const getUserByNameDB = async (name) => {
  const query = "SELECT id, name, email from users WHERE name LIKE ?";
  const [results] = await pool.execute(query, [`%${name}%`]);
  return results;
};
