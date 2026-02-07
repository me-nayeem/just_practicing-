const BASE_URL = "http://localhost:3001";
const AUTH_TOKEN_KEY = "authToken";
const AUTH_USER_KEY = "authUser";

export const UserSignup = async (signupData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    if (!response.ok) {
      const errorData = await response.json();

      const message = Array.isArray(errorData.messages)
        ? errorData.messages.join("\n")
        : errorData.message || "Failed to sign up";

      throw new Error(message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export function setToken(token, user = null) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  if (user) {
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } catch {}
  }
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function Logout(redirect = true) {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function UserLogin(credentials) {
  const url = `${BASE_URL}/api/auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();

      const message = Array.isArray(errorData.messages)
        ? errorData.messages.join("\n")
        : errorData.message || "Failed to sign up";

      throw new Error(message);
    }

    const data = await response.json();

    const token = data.token;

    if (!token) {
      const e = new Error("Login succeeded but no token returned by server.");
      e.data = data;
      throw e;
    }

    const user = data.data || null;
    let role = user?.role || null;

    setToken(token, user);

    return { token, user, role };
  } catch (err) {
    throw err;
  }
}
