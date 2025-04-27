<!-- web-vue/src/components/crypto/TransactionList.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction } from '../../../shared/types/market'

const props = defineProps<{
  transactions: Transaction[]
  type: 'buy' | 'sell'
}>()

const filteredTransactions = computed(() => {
  return props.transactions.filter(tx => tx.type === props.type)
})
</script>

<template>
  <div class="transaction-list">
    <h3>{{ type === 'buy' ? 'Buy' : 'Sell' }} Transactions</h3>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Price</th>
          <th>Volume</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in filteredTransactions" :key="tx.id">
          <td>{{ tx.type }}</td>
          <td>{{ tx.price }}</td>
          <td>{{ tx.volume }}</td>
          <td>{{ tx.timestamp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.transaction-list {
  height: 100%;
  overflow-y: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>