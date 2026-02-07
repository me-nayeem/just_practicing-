import { validateInput } from "../config/inputValidation.config.js";

export const validateUser = (req, res, next) => {
  const parseResult = validateInput.safeParse(req.body);
  if (!parseResult.success) {
    const { fieldErrors, formErrors } = parseResult.error.flatten();
    const messages = Object.values(fieldErrors).flat().concat(formErrors);
    return res.status(400).json({ success: false, messages });
  }
  req.validatedData = parseResult.data;
  next();
};
