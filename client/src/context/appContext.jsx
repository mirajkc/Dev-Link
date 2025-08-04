import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [login, setLogin] = useState(null);
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();


  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_SECRET_URL 

const authenticate = async () => {
  try {
    const { data } = await axios.get("/api/user/authenticate");
    const isAuthenticated = data?.isAuthenticated || false;
    setLogin(isAuthenticated);
    return isAuthenticated;
  } catch (error) {
    setLogin(false);
    return false; 
  }
};

const fetchUserData = async () => {
  try {
    const { data } = await axios.get("/api/user/get");
    setUserData(data.data);
  } catch (error) {
    if (error.response?.status !== 401) {
      toast.error(error.response?.data?.message || error.message);
    }
  }
};

useEffect(() => {
  const init = async () => {
    const isAuthenticated = await authenticate();
    if (isAuthenticated) {
      await fetchUserData();
    }
  };
  init();
}, []);

  useEffect(() => {
    const init = async () => {
      await authenticate();
      await fetchUserData();
    };
    init();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const value = {
    loading,
    setLoading,
    theme,
    setTheme,
    navigate,
    location,
    login,
    setLogin,
    userData,
    fetchUserData,
    authenticate
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
