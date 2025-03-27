import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on("connection", () => {
  console.log("MySQL pool connected");
});

pool.on("error", (err) => {
  console.error("MySQL pool error:", err);
});

export default pool;
