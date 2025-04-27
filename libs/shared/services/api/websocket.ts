// shared/services/api/websocket.ts
/**
 * WebSocket service for real-time market data
 */

import { TokenPair, PriceTick } from '../../types/market';

export class MarketWebSocket {
  private socket: WebSocket | null = null;
  private subscribers: Map<string, (data: PriceTick) => void> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private isExplicitDisconnect = false;

  constructor(private url: string) {}

  connect() {
    this.isExplicitDisconnect = false;
    this.socket = new WebSocket(this.url);
    
    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0; // Reset on successful connection
      this.resubscribeAll();
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as PriceTick;
      this.notifySubscribers(data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (!this.isExplicitDisconnect) {
        this.reconnect();
      }
    };

    this.socket.onclose = () => {
      if (!this.isExplicitDisconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnect();
      }
    };
  }

  private reconnect() {
    this.reconnectAttempts++;
    const delay = Math.min(1000 * this.reconnectAttempts, 5000); // Exponential backoff
    console.log(`Reconnecting in ${delay}ms... (Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    setTimeout(() => this.connect(), delay);
  }

  // Subscribe to a specific pair
  subscribe(pairId: string, callback: (data: PriceTick) => void) {
    this.subscribers.set(pairId, callback);
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.sendSubscribeMessage(pairId);
    }
  }

  // Unsubscribe from a specific pair
  unsubscribe(pairId: string) {
    if (this.subscribers.has(pairId)) {
      this.subscribers.delete(pairId);
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.sendUnsubscribeMessage(pairId);
      }
    }
  }

  // Cleanup all subscriptions and close connection
  disconnect() {
    this.isExplicitDisconnect = true;
    this.subscribers.clear();
    
    if (this.socket) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.close(1000, 'Client disconnected'); // Normal closure
      }
      this.socket = null;
    }
  }

  private resubscribeAll() {
    this.subscribers.forEach((_, pairId) => {
      this.sendSubscribeMessage(pairId);
    });
  }

  private sendSubscribeMessage(pairId: string) {
    this.socket?.send(JSON.stringify({
      action: 'subscribe',
      pairId
    }));
  }

  private sendUnsubscribeMessage(pairId: string) {
    this.socket?.send(JSON.stringify({
      action: 'unsubscribe',
      pairId
    }));
  }

  private notifySubscribers(data: PriceTick) {
    const callback = this.subscribers.get(data.pairId);
    callback?.(data);
  }

  // Get current subscription count
  getSubscriptionCount(): number {
    return this.subscribers.size;
  }

  // Check if connected
  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}