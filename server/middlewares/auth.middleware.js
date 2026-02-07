import { body, validationResult } from "express-validator";

export const LoginInputValidate = [
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
    
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["user", "admin"])
    .withMessage('Role must be either "user" or "admin"'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        messages: errors.array().map((err) => err.msg),
      });
    }

    next();
  },
];
