-- server/src/infrastructure/database/migrations/202310010000_init.sql
BEGIN;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create networks table
CREATE TABLE networks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    chain_id VARCHAR(50) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create tokens table
CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    network_id INTEGER REFERENCES networks(id),
    symbol VARCHAR(20) NOT NULL,
    contract_address VARCHAR(100),
    decimals INTEGER DEFAULT 18,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(network_id, symbol)
);

-- Create market_data table
CREATE TABLE market_data (
    id SERIAL PRIMARY KEY,
    pair_id INTEGER NOT NULL,
    price NUMERIC(30, 18) NOT NULL,
    volume NUMERIC(30, 18) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    change NUMERIC(10, 4)
);

-- Create indexes for performance
CREATE INDEX idx_market_data_pair_id ON market_data(pair_id);
CREATE INDEX idx_market_data_timestamp ON market_data(timestamp);

COMMIT;