// server/src/domains/market-data/market.controller.ts
/**
 * Market API controller
 * Handles HTTP requests for market data
 * Input validation and response formatting
 */

import { Controller, Get, Query, Param } from '@nestjs/common';
import { MarketService } from './market.service';
import { 
  ApiTags, 
  ApiResponse, 
  ApiQuery, 
  ApiOperation,
  ApiParam 
} from '@nestjs/swagger';
import { 
  Network,
  TokenPair,
  PriceTick,
  Timeframe
} from '../../../../shared/types/market';

@Controller('market')
@ApiTags('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('networks')
  @ApiOperation({ summary: 'Get list of available blockchain networks' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns all active networks',
    type: [Network]
  })
  async getNetworks(): Promise<Network[]> {
    return this.marketService.getActiveNetworks();
  }

  @Get('pairs')
  @ApiOperation({ summary: 'Get trading pairs for a specific network' })
  @ApiQuery({ 
    name: 'network', 
    description: 'Network ID to filter pairs',
    required: true,
    example: 'ethereum',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'List of token pairs with market data',
    type: [TokenPair]
  })
  async getTokenPairs(@Query('network') networkId: string): Promise<TokenPair[]> {
    return this.marketService.getTokenPairs(networkId);
  }

  @Get('history/:pairId')
  @ApiOperation({ summary: 'Get historical price data for a trading pair' })
  @ApiParam({
    name: 'pairId',
    description: 'Trading pair identifier',
    example: 'ETH-USDC'
  })
  @ApiQuery({
    name: 'timeframe',
    description: 'Time interval for historical data',
    required: true,
    example: '1d',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Array of price ticks for the specified timeframe',
    type: [PriceTick]
  })
  async getPriceHistory(
    @Param('pairId') pairId: string,
    @Query('timeframe') timeframe: string
  ): Promise<PriceTick[]> {
    return this.marketService.getPriceHistory(pairId, timeframe);
  }
}