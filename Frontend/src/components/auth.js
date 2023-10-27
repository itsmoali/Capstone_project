import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true" ? true : false
    );

    // const login = (e) => {
    //     setIsLoggedIn(true);
    // };

    const login = () => {
        // localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    }

    const logout = () => {
        // localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
    };

    

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);