import pool from "../config/database.pool.js";
import bcrypt from "bcrypt";

export const inserUser = async ({
  username,
  email,
  password,
  fullName,
  phone,
  role,
  termsAccepted,
}) => {

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (username, email, full_name, password_hash, phone, role, terms_accepted)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, username, email, full_name, role, created_at`,
    [
      username,
      email,
      fullName,
      passwordHash,
      phone,
      role || "user",
      termsAccepted,
    ],
  );

  return result.rows[0];
};

export const findIsUserExits = async (username) => {
  // Check if user already exists
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE username = $1",
    [username],
  );

  if (existingUser.rows.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const getUser = async (username) =>  {
  const queryText = `SELECT * FROM users WHERE username = $1`;
  const user = await pool.query(queryText, [username]);
 return user;
}


