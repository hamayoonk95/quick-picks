import React, {useState, useEffect} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get('/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUserId(decoded.userId);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/account");
            }
        }
    }
 
    const axiosJWT = axios.create();
    
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            console.log("decoded "+decoded);
            setUserId(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    
    const getUsers = async () => {
        const response = await axiosJWT.get('/analytics', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUser(response.data);
    }

    // useEffect(() => {
    //     async function checkAuth() {
    //         try {
    //             // Make a request to the server to check if the user is authenticated
    //             const response = await axios.get("/analytics", {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    //                 }
    //             });
    //             setIsAuthenticated(response.data.isAuthenticated);
    //             setUser(response.data.user);
    //         } catch (error) {
    //             navigate("/account");
    //         }
    //     }
    //     checkAuth();
    // }, []);

    if (!isAuthenticated) {
        return navigate("/account");
    }

    return (
        <div>Hello {user.username}</div>
    )
}


export default Analytics;