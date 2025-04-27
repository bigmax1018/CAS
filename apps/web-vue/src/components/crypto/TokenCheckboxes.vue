<!-- web-vue/src/components/crypto/TokenCheckboxes.vue -->
<template>
  <div class="token-checkboxes">
    <div class="checkbox-item">
      <input 
        type="checkbox" 
        id="mainToken" 
        v-model="mainTokenChecked" 
        disabled
      />
      <label for="mainToken">Main Token</label>
    </div>
    <div class="checkbox-item">
      <input 
        type="checkbox" 
        id="referenceToken" 
        v-model="referenceTokenChecked"
        @change="handleReferenceTokenChange"
      />
      <label for="referenceToken">Reference Token</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMarketStore } from '@/stores/market'

const marketStore = useMarketStore()
const mainTokenChecked = ref(true)
const referenceTokenChecked = ref(false)

const handleReferenceTokenChange = () => {
  marketStore.toggleReferenceToken(referenceTokenChecked.value)
}
</script>

<style scoped>
.token-checkboxes {
  display: flex;
  gap: 1rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>