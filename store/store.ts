import { api } from '@/services/apiInstance'
import { configureStore } from '@reduxjs/toolkit'
import { combinedReducer } from './reducer'

export const makeStore = () => {
  return configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']