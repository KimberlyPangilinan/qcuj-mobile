import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { articleApi } from './services/article'
import { recommendationApi } from './services/recommendation'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [articleApi.reducerPath]: articleApi.reducer,
    [recommendationApi.reducerPath]: recommendationApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articleApi.middleware)
      .concat(recommendationApi.middleware),
    
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)