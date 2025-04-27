// shared/services/feature-flags.ts
import { Unleash } from 'unleash-client';

// Environment Config Types
interface UnleashConfig {
  UNLEASH_URL: string;
  UNLEASH_INSTANCE_ID: string;
  NODE_ENV?: string;
}

// Context Type
interface UnleashContext {
  user?: {
    id: string;
  };
  session?: {
    id: string;
  };
}

// Initialize Unleash Client based on environment
const initializeUnleash = () => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    // Browser environment - use proxy client
    const { UnleashClient } = require('unleash-proxy-client');
    return new UnleashClient({
      url: import.meta.env.VITE_UNLEASH_PROXY_URL,
      clientKey: import.meta.env.VITE_UNLEASH_PROXY_KEY,
      appName: 'cas-frontend',
      refreshInterval: 15_000
    });
  } else {
    // Node.js environment
    const config: UnleashConfig = {
      UNLEASH_URL: process.env.UNLEASH_URL || 'http://localhost:4242/api',
      UNLEASH_INSTANCE_ID: process.env.UNLEASH_INSTANCE_ID || 'default:development.unleash-insecure-api-token',
      NODE_ENV: process.env.NODE_ENV
    };
    
    return new Unleash({
      appName: 'cas-backend',
      url: config.UNLEASH_URL,
      instanceId: config.UNLEASH_INSTANCE_ID,
      refreshInterval: 15_000
    });
  }
};

const unleash = initializeUnleash();

export const isEnabled = (flag: string, context?: UnleashContext): boolean => {
  return unleash.isEnabled(flag, {
    userId: context?.user?.id,
    sessionId: context?.session?.id,
    properties: {
      environment: (import.meta.env?.VITE_ENV || process.env.NODE_ENV) || 'development'
    }
  });
};