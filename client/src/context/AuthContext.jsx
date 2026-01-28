import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../config/axios.js';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/auth/status');
                if (response.data.isAuthenticated) {
                    dispatch({ type: 'SET_USER', payload: response.data.user });
                } else {
                    dispatch({ type: 'SET_LOADING', payload: false });
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        checkAuth();
    }, []);

    const register = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await api.post('/auth/register', userData);

            if (response.data.success) {
                dispatch({ type: 'SET_USER', payload: response.data.user });
                toast.success('Account created successfully!');
                return { success: true };
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            dispatch({ type: 'SET_ERROR', payload: message });
            toast.error(message);
            return { success: false, message };
        }
    };

    const login = async (credentials) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await api.post('/auth/login', credentials);

            if (response.data.success) {
                dispatch({ type: 'SET_USER', payload: response.data.user });
                toast.success('Welcome back!');
                return { success: true };
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            dispatch({ type: 'SET_ERROR', payload: message });
            toast.error(message);
            return { success: false, message };
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            dispatch({ type: 'LOGOUT' });
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
            // Still logout on client side even if server request fails
            dispatch({ type: 'LOGOUT' });
            toast.error('Logout failed, but you have been logged out locally');
        }
    };

    const value = {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};