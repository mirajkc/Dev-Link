import { createContext, useContext, useEffect, useState } from "react";
import { useAppContext } from "./appContext";
import axios from "axios";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { theme, navigate } = useAppContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [adminLoginValue, setAdminLoginValue] = useState(false);
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  //* manual login
const loginUser = async () => {
  try {
    setLoading(true);
    const { data } = await axios.post('/api/admin/login', { username, password });

    if (!data.success) {
      toast.error(`Some Error Occurred: ${data.message}`);
      return;
    }

    setAdminLoginValue(true);
    navigate('/admin');
    toast.success(data.message || "Login successful");
    setPassword('');
  } catch (error) {
    toast.error(`Some Error Occurred: ${error.message}`);
  } finally {
    setLoading(false);
  }
};


  //* autologin on provider mount
  const autoLogin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/authenticate');
      if (data.success) {
        setAdminLoginValue(true);
      }
    } catch (error) {
      console.log("AutoLogin Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  const value = {
    username,
    setUsername,
    password,
    setPassword,
    adminLoginValue,
    setAdminLoginValue,
    loading,
    setLoading,
    loginUser,
    autoLogin,
    theme,
    navigate,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdminContext = () => useContext(AdminContext);
