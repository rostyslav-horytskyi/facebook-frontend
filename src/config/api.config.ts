/**
 * API Configuration
 *
 * This file contains centralized API configuration.
 * Environment-specific settings are determined automatically.
 */

// Base API URL
const getBaseUrl = () => {
  // For production, use environment variable or fallback to production URL
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://api.example.com';
  }

  // For development, use local server
  return import.meta.env.VITE_API_URL || 'http://localhost:8000';
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),

  // Authentication endpoints
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    ACTIVATE: '/activate',
    VERIFY_SEND: '/sendVerification',
    VERIFY_CODE: '/findUser',
    RESET_PASSWORD: '/resetPassword',
    CHANGE_PASSWORD: '/changePassword',
  },

  // User endpoints
  USER: {
    GET_PROFILE: '/user',
    UPDATE_PROFILE: '/updateProfile',
    UPLOAD_PICTURE: '/uploadProfilePicture',
    FRIENDS: '/friends',
  },

  // Posts endpoints
  POSTS: {
    GET_POSTS: '/posts',
    CREATE_POST: '/createPost',
    DELETE_POST: '/deletePost',
    LIKE_POST: '/reactPost',
    COMMENT_POST: '/comment',
  },

  // Request configuration
  REQUEST: {
    TIMEOUT: 15000, // 15 seconds
    RETRY_ATTEMPTS: 2,
    CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  },
};

/**
 * Creates a full API URL
 *
 * @param endpoint - The API endpoint path
 * @returns Full API URL
 */
export const createApiUrl = (endpoint: string): string =>
  `${API_CONFIG.BASE_URL}${endpoint}`;
