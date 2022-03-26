import React, { useState, useEffect } from 'react'
import axiosConfig from '../axiosConfig';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: '', name: '', isVendor: false, avatar: '', vendorMode: false });
  const [vendorMode, setVendorMode] = useState(false);
  
  useEffect(() => {
    function setUserId() {
      const userId = localStorage.getItem('userId')
      const name = localStorage.getItem('name')
      const avatar = localStorage.getItem('avatar')
      let isVendor = localStorage.getItem('isVendor')
      let vendorMode = localStorage.getItem('vendorMode')
      if (isVendor === 'true') {
        isVendor = true
      }

      if (userId) {
        setUser({ userId, name, isVendor, avatar, vendorMode })
      }
    }

    setUserId();
  }, [])

  const login = async (e, userId) => {
    e.preventDefault();
    localStorage.setItem('userId', userId)
    
    try {
      const { data } = await axiosConfig.get(`/users/${userId}`);
      setUser({ userId: data.id, name: data.full_name, isVendor: data.is_vendor, avatar: data.avatar, vendorMode: false });
      localStorage.setItem('isVendor', data.is_vendor)
      localStorage.setItem('avatar', data.avatar)
      localStorage.setItem('name', data.full_name)
    
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    localStorage.clear()

    setUser(() => ({
      userId: '',
      isVendor: false,
      avatar: '',
      vendorMode: false
    }));
  };

  const setVendorModeFromStorage = () => {
    localStorage.setItem('vendorMode', (localStorage.getItem('isVendor')) ? true : false)
  }

  return (
    <UserContext.Provider value={{ user, login, logout, setVendorMode, setVendorModeFromStorage}} >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider
export const UserContext = React.createContext({ userId: '', name: '', isVendor: false, avatar: ''});
