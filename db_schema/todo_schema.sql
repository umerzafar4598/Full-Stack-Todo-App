-- Todo App Database Schema
-- Run this script to set up your PostgreSQL database

-- Drop tables if they exist (for development)
DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS session CASCADE;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Todos Table
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    deadline TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Session Table (for connect-pg-simple)
CREATE TABLE session (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (sid)
);

-- Indexes for better query performance
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_deadline ON todos(deadline);
CREATE INDEX idx_todos_completed ON todos(completed);
CREATE INDEX idx_session_expire ON session(expire);

-- Comments
COMMENT ON TABLE users IS 'Stores user account information';
COMMENT ON TABLE todos IS 'Stores todo items for users';
COMMENT ON TABLE session IS 'Stores session data for Passport.js authentication';

