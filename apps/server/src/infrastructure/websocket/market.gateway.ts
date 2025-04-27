// server/src/infrastructure/websocket/market.gateway.ts
/**
 * WebSocket gateway for:
 * - Real-time candlestick streams
 * - Order book depth
 * - Trade executions
 */
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { RedisClient } from '../cache/redis.client';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  path: '/ws/market'
})
export class MarketGateway {
  @WebSocketServer() server;
  private logger = new Logger(MarketGateway.name);

  constructor(private readonly redis: RedisClient) {
    this.initSubscriptions();
  }

  private async initSubscriptions() {
    const subscriber = this.redis.duplicate();
    await subscriber.connect();

    subscriber.subscribe('candles:*', (message, channel) => {
      const pair = channel.split(':')[1];
      this.server.emit(`candles/${pair}`, message);
    });

    subscriber.subscribe('trades:*', (message) => {
      const trade = JSON.parse(message);
      this.server.emit(`trades/${trade.pair}`, trade);
    });
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(client, { pair, interval }: { pair: string; interval: string }) {
    this.logger.log(`Client subscribed to ${pair}/${interval}`);
    client.join(`pair:${pair}`);
  }
}

// # Start WebSocket server
// nest start market-gateway
// # Start processing worker
// node dist/domains/market-data/market.service.js