import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Hàm đăng nhập
    const login = (token) => {
        setUser(token);
    };

    // Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem('token'); // Xóa token từ localStorage
        setUser(null);
    };

    // Hàm kiểm tra đăng nhập (có token trong localStorage không)
    const isAuthenticated = () => {
        return !!user?.token;
    };

    useEffect(() => {
        // Kiểm tra có token trong localStorage không khi component mount
        const token = localStorage.getItem('token');
        if (token) {
            login(token);
        }
    }, []);

    const contextValue = {
        user,
        login,
        logout,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
