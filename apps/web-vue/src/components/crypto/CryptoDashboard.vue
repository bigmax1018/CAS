<!-- web-vue/src/components/crypto/CryptoDashboard.vue -->
<template>
  <div class="crypto-dashboard">
    <!-- Layout 1: Header Row -->
    <div class="header-row">
      <div class="logo-section">
        <img src="@/assets/images/logo.png" alt="CAS Logo" class="logo">
        <span class="logo-text">CAS</span>
      </div>
      <div class="trading-pair-info">
        <span class="pair">ETH-USDT</span>
        <span class="price">Price: XXXXXXXXXXX</span>
        <span class="market-cap">Market Cap: SXXXXXXXXX</span>
      </div>
      <div class="search-box">
        <input type="text" placeholder="Search..." class="search-input">
        <button class="search-button">
          <MagnifierIcon />
        </button>
      </div>
    </div>

    <!-- Layout 2: Selection Row -->
    <div class="selection-row">
      <div class="network-column">
        <NetworkSelector />
      </div>
      <div class="token-column">
        <TokenPairSelector />
      </div>
      <div class="timeframe-section">
        <TimeframeSelector />
      </div>
      <div class="token-checkboxes">
        <TokenCheckboxes />
      </div>
      <div class="stats-section">
        <24HStats />
      </div>
    </div>

    <!-- Layout 3: Chart and Transactions -->
    <div class="chart-transaction-row">
      <div class="transactions-column">
        <TransactionList />
      </div>
      <div class="main-chart">
        <MainChart />
      </div>
    </div>

    <!-- Layout 4: Similar Tokens -->
    <div class="similar-tokens-row">
      <SimilarTokens />
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import NetworkSelector from './NetworkSelector.vue'
import TokenPairSelector from './TokenPairSelector.vue'
import TimeframeSelector from './TimeframeSelector.vue'
import TokenCheckboxes from './TokenCheckboxes.vue'
import MainChart from './MainChart.vue'
import SimilarTokens from './SimilarTokens.vue'
import TransactionList from './TransactionList.vue'
import MagnifierIcon from '@/components/ui/icons/MagnifierIcon.vue'
</script>

<style scoped>
/* Layout styling based on your requirements */
.crypto-dashboard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--header-bg);
}

.selection-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.chart-transaction-row {
  display: flex;
  gap: 1rem;
  height: 400px; /* Default height as requested */
}

.transactions-column {
  width: 300px;
}

.main-chart {
  flex: 1;
}

.similar-tokens-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>