import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ThemeMode = "light" | "dark" | "system"

interface UiState {
  theme: ThemeMode
  sidebarOpen: boolean
}

const initialState: UiState = {
  theme: "dark",
  sidebarOpen: true,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarOpen, setTheme } = uiSlice.actions
export default uiSlice.reducer
