// shared/services/api/api.client.ts
/**
 * Base API client with error handling and interceptors
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { AuthTokens } from '../../types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// api.client.ts
export class ApiClient {
  private baseUrl: string = '';
  private defaultHeaders: Record<string, string>;
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }
  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      // Add other default headers like auth tokens here
    };
  }

  // GET - Retrieve data
  async get<T>(endpoint: string, queryParams?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
    });
    return this.handleResponse<T>(response);
  }

  // POST - Create new data
  async post<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  // PUT/PATCH - Update existing data
  async put<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: this.defaultHeaders,
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  // DELETE - Remove data
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.defaultHeaders,
    });
    return this.handleResponse<T>(response);
  }

  // Shared response handler
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `API request failed: ${response.statusText}`
      );
    }
    return response.json();
  }

  // Helper to set auth tokens
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
}