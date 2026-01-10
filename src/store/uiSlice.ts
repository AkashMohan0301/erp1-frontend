import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ThemeMode = "light" | "dark" | "system"

interface UiState {
  theme: ThemeMode
  sidebarOpen: boolean
}

const initialState: UiState = {
  theme: "dark", // default dark
  sidebarOpen: true,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload
      // Sync to localStorage
      localStorage.setItem('theme', action.payload)
    },
    toggleTheme(state) {
      const newTheme = state.theme === "dark" ? "light" : "dark"
      state.theme = newTheme
      localStorage.setItem('theme', newTheme)
    }
  },
})

export const { toggleSidebar, setTheme, toggleTheme } = uiSlice.actions
export default uiSlice.reducer
