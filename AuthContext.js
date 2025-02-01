import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(JSON.parse(storedToken).token); // Access the token property
      }
    };
    loadToken();
  }, []);

  const login = async (data) => {
    setToken(data.token); // Store the token property
    await AsyncStorage.setItem("token", JSON.stringify(data));
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
