import { findIsUserExits, inserUser } from "../repositories/auth.repository.js";
import jwt from "jsonwebtoken";
import { getUser } from "../repositories/auth.repository.js";
import bcrypt from "bcrypt";

export const userLoginController = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    req.body;
    const result = await getUser(username);
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      success: true,
      token,
      data: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

    const result = await pool.query(
      `SELECT rt.user_id, rt.expires_at, u.username, u.email, u.role, u.is_active
       FROM refresh_tokens rt
       JOIN users u ON rt.user_id = u.id
       WHERE rt.token = $1 AND rt.expires_at > CURRENT_TIMESTAMP AND rt.revoked_at IS NULL`,
      [refreshToken],
    );

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Invalid or expired refresh token" });
    }

    const user = result.rows[0];

    // ✅ New access token: 15 minutes (not 7 days!)
    const accessToken = jwt.sign(
      {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }, // Changed from '7d'
    );

    return res.status(200).json({
      accessToken,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const userLogoutController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      // Revoke refresh token
      await pool.query(
        "UPDATE refresh_tokens SET revoked_at = CURRENT_TIMESTAMP WHERE token = $1",
        [refreshToken],
      );
    }

    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const userSignupController = async (req, res) => {
  try {
    //check user is already created
    const isUserValid = await findIsUserExits(req.validatedData.username);
    if (isUserValid) {
      return res.status(409).json({
        success: false,
        message: "User with this username already exists",
      });
    }
    // Insert user
    const newUser = await inserUser(req.validatedData);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Internal Problem!", error });
  }
};
