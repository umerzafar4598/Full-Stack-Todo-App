import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../config/axios.js';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext.jsx';

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
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
  todos: [],
  loading: true,
  error: null,
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Fetch todos when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    } else {
      dispatch({ type: 'SET_TODOS', payload: [] });
    }
  }, [isAuthenticated]);

  const fetchTodos = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.get('/todos');
      
      if (response.data.success) {
        dispatch({ type: 'SET_TODOS', payload: response.data.todos });
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch todos' });
      toast.error('Failed to load todos');
    }
  };

  const addTodo = async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      
      if (response.data.success) {
        dispatch({ type: 'ADD_TODO', payload: response.data.todo });
        toast.success('Todo created successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create todo';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const response = await api.put(`/todos/${id}`, todoData);
      
      if (response.data.success) {
        dispatch({ type: 'UPDATE_TODO', payload: response.data.todo });
        toast.success('Todo updated successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update todo';
      toast.error(message);
      return { success: false, message };
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await api.patch(`/todos/${id}/toggle`);
      
      if (response.data.success) {
        dispatch({ type: 'UPDATE_TODO', payload: response.data.todo });
        const status = response.data.todo.completed ? 'completed' : 'pending';
        toast.success(`Todo marked as ${status}!`);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to toggle todo';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      
      if (response.data.success) {
        dispatch({ type: 'DELETE_TODO', payload: id });
        toast.success('Todo deleted successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete todo';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    todos: state.todos,
    loading: state.loading,
    error: state.error,
    fetchTodos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};