import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminContextType, ContentState } from '../types';
import { AUTH_CREDS, DEFAULT_CONTENT } from '../constants';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // savedContent is what is in the DB/LocalStorage
  const [savedContent, setSavedContent] = useState<ContentState>(DEFAULT_CONTENT);
  // content is the live state (what is shown on screen)
  const [content, setContent] = useState<ContentState>(DEFAULT_CONTENT);

  useEffect(() => {
    // Load persisted content
    const persisted = localStorage.getItem('ivri_content');
    if (persisted) {
      const parsed = { ...DEFAULT_CONTENT, ...JSON.parse(persisted) };
      setSavedContent(parsed);
      setContent(parsed);
    }

    // Check session
    const session = localStorage.getItem('ivri_admin_session');
    if (session === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (u: string, p: string) => {
    if (u === AUTH_CREDS.username && p === AUTH_CREDS.password) {
      setIsAdmin(true);
      localStorage.setItem('ivri_admin_session', 'true');
      setLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (hasUnsavedChanges) {
      if (!confirm("You have unsaved changes. Discard them?")) return;
    }
    discardChanges(); // Revert any changes before logging out
    setIsAdmin(false);
    localStorage.removeItem('ivri_admin_session');
  };

  const updateContent = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const saveChanges = () => {
    setSavedContent(content);
    localStorage.setItem('ivri_content', JSON.stringify(content));
  };

  const discardChanges = () => {
    setContent(savedContent);
  };

  const hasUnsavedChanges = JSON.stringify(content) !== JSON.stringify(savedContent);

  return (
    <AdminContext.Provider value={{
      isAdmin,
      login,
      logout,
      content,
      updateContent,
      saveChanges,
      discardChanges,
      hasUnsavedChanges,
      isLoginModalOpen,
      setLoginModalOpen
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
