// mobile-react/src/App.tsx
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { store } from '../../shared/stores'
import { AppNavigator } from './navigation'
import { AuthProvider } from '../../shared/context/AuthContext'

/**
 * Main app component with providers
 */
export default function App() {
  return (
    <StoreProvider store={store}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </StoreProvider>
  )
}