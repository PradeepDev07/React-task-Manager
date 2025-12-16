import { createContext, useContext, useState } from "react";
import { getCurrentUser, setCurrentUser, logout } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getCurrentUser());

    const login = (userData) => {
        console.log("AuthContext: Logging in user:", userData);
        setCurrentUser(userData);
        setUser(userData);
    };

    const signOut = () => {
        console.log("AuthContext: Signing out");
        logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;