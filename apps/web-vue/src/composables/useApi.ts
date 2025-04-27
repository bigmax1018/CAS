// web-vue/src/composables/useApi.ts
/**
 * Axios interceptor for trace propagation
 */
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { trace } from '@opentelemetry/api';

export function useApi() {
  const api = axios.create();

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const span = trace.getActiveSpan();
    if (span && config.headers) {
      const spanContext = span.spanContext();
      const sentryTraceHeader = `${spanContext.traceId}-${spanContext.spanId}-01`;
      config.headers['sentry-trace'] = sentryTraceHeader;
    }
    return config;
  });

  return api;
}