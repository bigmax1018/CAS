// web-vue/src/composables/useDarkMode.ts
import { ref, watchEffect } from 'vue'

/**
 * Dark mode toggle composable with system preference detection
 */
export function useDarkMode() {
  const isDarkMode = ref(false)

  // Check system preference
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    isDarkMode.value = mediaQuery.matches

    mediaQuery.addEventListener('change', (e) => {
      isDarkMode.value = e.matches
    })
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  // Apply class to document element
  watchEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }
    }
  })

  return {
    isDarkMode,
    toggleDarkMode,
  }
}