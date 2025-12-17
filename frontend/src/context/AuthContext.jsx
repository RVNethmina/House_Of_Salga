import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

// Create the context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cToken, setCToken] = useState(() => localStorage.getItem("cToken"));
  const [aToken, setAToken] = useState(() => localStorage.getItem("aToken"));
  const [role, setRole] = useState("visitor");
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api";

  // Check for tokens when the app starts
  useEffect(() => {
    const validateTokens = async () => {
      setIsAuthLoading(true);
      const localCToken = localStorage.getItem("cToken");
      const localAToken = localStorage.getItem("aToken");

      try {
        if (localAToken) {
          const response = await axios.get(`${backendUrl}/auth/admin/verify`);
          setUser(response.data.user);
          setRole("admin");
        } else if (localCToken) {
          const response = await axios.get(`${backendUrl}/auth/verify`);
          setUser(response.data.user);
          setRole("customer");
        } else {
          setRole("visitor");
        }
      } catch (error) {
        console.error("Token validation failed", error);
        logout();
      } finally {
        setIsAuthLoading(false);
      }
    };

    validateTokens();
  }, []);

  const customerLogin = async (email, password) => {
    try {
      // 1. MAKE THE REQUEST DIRECTLY HERE
      const response = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
      });

      // 2. GET DATA FROM RESPONSE
      const { token, user } = response.data;

      // 3. UPDATE STATE
      localStorage.setItem("cToken", token);
      setCToken(token);
      setUser(user);
      setRole("customer");

      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed");
      return false; // Failed
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/auth/admin/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("aToken", token);
      setAToken(token);
      setUser(user);
      setRole("admin");

      return true;
    } catch (error) {
      console.error("Admin Login Error:", error);
      toast.error(error.response?.data?.message || "Admin login failed");
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/auth/register`, {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  };

  const updateProfile = async (name, email) => {
    try {
      if (!cToken) {
        throw new Error("No authentication token found");
      }

      const response = await axios.put(
        `${backendUrl}/auth/update-profile`,
        {
          name,
          email,
        },
        { headers: { Authorization: `Bearer ${cToken}` } }
      );
      setUser((prev) => ({
        ...prev, // Copy EVERYTHING from the old object (id, name, email, image)
        name, // Overwrite name
        email, // Overwrite email
      }));
      return response.data;
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setCToken(null);
    setAToken(null);
    localStorage.removeItem("cToken");
    localStorage.removeItem("aToken");
    setRole("visitor");
  };

  const authValue = {
    user,
    cToken,
    aToken,
    role,
    isAuthLoading,
    customerLogin,
    adminLogin,
    register,
    logout,
    updateProfile,
  };

  return (
    // 1. AuthContext.Provider is the actual component that "broadcasts" the data.
    // 2. 'value={authValue}' is the specific data we are broadcasting (user, login function, etc.).
    // Any child component can tune in and read this 'value'.
    <AuthContext.Provider value={authValue}>
      {/* 3. The Logic Check: !isAuthLoading && children
        - isAuthLoading starts as true while we check if the user is logged in (checking localStorage).
        - We DO NOT want to render the app (children) until we know for sure if they are logged in.
        - If we rendered too early, the user might see the "Login" button flash for a second even if they are already logged in.
        - So, we only render '{children}' (the rest of your App) when loading is finished (!isAuthLoading).
      */}
      {!isAuthLoading && children}
    </AuthContext.Provider>
  );
};

// This is a "Custom Hook". It's a shortcut function for other pages to use.
export const useAuth = () => {
  // 1. useContext is a React tool that says: "Go find the nearest AuthProvider above me."
  // 2. It grabs the 'value' object (user, login, logout, etc.) from that Provider.
  const context = useContext(AuthContext);

  // 3. Safety Check:
  // If you try to use useAuth() in a component that is NOT wrapped inside <AuthProvider>,
  // 'context' will be null. This throws an error to warn the developer.
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // 4. Return the data (user, token, login function, etc.) to the component that called this hook.
  return context;
};
