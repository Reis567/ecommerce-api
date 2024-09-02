import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthContextType {
  userId: number | null;
  username: string | null;
  userType: string | null;  // Adicionando o userType ao contexto
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);  // Estado para o userType

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/users/me/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserId(data.id);
      setUsername(data.username);
      setUserType(data.user_type);  // Salvando o userType no estado
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, username, userType, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
