-- server/src/infrastructure/database/migrations/202310020000_add_crypto_tables.sql
/**
 * Creates tables for crypto market data storage.
 * Includes indexes for performance and constraints for data integrity.
 */
BEGIN;

CREATE TABLE IF NOT EXISTS market_data (
  id SERIAL PRIMARY KEY,
  pair VARCHAR(20) NOT NULL,          -- e.g., 'ETH-USDT'
  price DECIMAL(24, 12) NOT NULL,     -- Supports precise crypto values
  volume DECIMAL(24, 12) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  exchange VARCHAR(50) NOT NULL      -- Source exchange (e.g., 'binance')
);

-- Optimize frequent queries
CREATE INDEX idx_market_data_pair ON market_data (pair);
CREATE INDEX idx_market_data_timestamp ON market_data (timestamp);

COMMIT;