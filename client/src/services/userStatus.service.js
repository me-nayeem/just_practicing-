import {getToken} from "../services/auth.service.js";
export const isLoggedIn  = () => {
  const token = getToken();
}