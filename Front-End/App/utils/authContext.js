import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const BASE_URL = "http://172.17.198.119:3000/api";

  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/status`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const user = await response.json();
        setIsLoggedIn(true);
        setUserDetails(user); 
        await AsyncStorage.setItem("userDetails", JSON.stringify(user));
      } else {
        setIsLoggedIn(false);
        setUserDetails(null);
        await AsyncStorage.removeItem("userDetails");
      }
    } catch (error) {
      console.error("Failed to check login status:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails, checkLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
