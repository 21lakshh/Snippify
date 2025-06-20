import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type AuthContextType = {
    user: null | {
        id: string;
        email: string;
        username: string;
    };
    isLoading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => { // it tells that it is expecting a children prop which is a ReactNode (whatever is inside the AuthProvider component when we use it in App.tsx)
    const [user, setUser] = useState<AuthContextType["user"]>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try{
                const response = await axios.get("https://snippify-backend.lakshyapaliwal200.workers.dev/api/v1/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                setUser(response.data);
                setIsLoading(false);
                } catch (error: any) {
                    if (error.response?.status === 401) {
                        localStorage.removeItem("token");
                        setUser(null);
                        setIsLoading(false);
                    }
                    else{
                        console.error("Error fetching user data:", error);
                        setIsLoading(false);
                    }
                }
            } else {
                setIsLoading(false);
            }
        }
        
        checkAuth();
    }, [])

    const login = async (token: string) => {
        localStorage.setItem("token", token);
        const result = await axios.get("https://snippify-backend.lakshyapaliwal200.workers.dev/api/v1/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        setUser(result.data);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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