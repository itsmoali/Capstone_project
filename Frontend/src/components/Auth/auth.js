import { createContext, useState, useContext, useEffect } from "react";
import client from './path';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {



    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "false" ? false : true
    );

    const [user, setUser] = useState(
        localStorage.getItem("user") || null
    );

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );
   



    function signup(username, email, password) {
        return new Promise((resolve, reject) => {
            client.post('/signup', {
                email: email,
                username: username,
                password: password
            }).then((response) => {
                localStorage.setItem("user", response.data.user.email);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isLoggedIn", "true");
                resolve(true); // Resolve with true when signup is successful
            }).catch((error) => {
                console.error('Network error:', error.response.data);
                reject(false); // Reject with false if there's an error
            });
        });
    }

    function login(email, password) {
        return new Promise((resolve, reject) => {
            client.post('/login', {
                email: email,
                password: password
            }).then((response) => {
                localStorage.setItem("user", response.data.user.email);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isLoggedIn", "true");
                resolve(true); // Resolve with true when login is successful
            }).catch((error) => {
                console.error('Network error:', error.response.data);
                reject(false); // Reject with false if there's an error
            });
        });
    }
    

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    };

    

    return (
        <AuthContext.Provider value={{ signup, login, logout, user, isLoggedIn, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);