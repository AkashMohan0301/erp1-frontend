import { configureStore } from "@reduxjs/toolkit"
import authContextReducer from "./authContextSlice"

export const store = configureStore({
  reducer: {
    authContext: authContextReducer,
  },
})

// Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
