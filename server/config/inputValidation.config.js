import z from "zod";

export const validateInput = z.object({
  username: z
    .string()
    .trim()
    .min(3, "More than three characters please")
    .max(25, "Username is too long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),

  email: z.string().trim().email("Invalid email format").toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Phone must be in E.164 format (e.g., +1234567890)",
    ),

  role: z.enum(["user", "admin"], `Role must be either user or admin`),

  termsAccepted: z.literal(true, "You must accept the terms and conditions"),
});
