import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ThemeMode = "light" | "dark" | "system"

export type test = "Test" | "Test2" | "Test3"

interface UiState {
  theme: ThemeMode
  sidebarOpen: boolean
}

// Safely read from localStorage (no server error)
const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "dark" // Server fallback
  try {
    const saved = localStorage.getItem("theme")
    return (saved as ThemeMode) || "dark"
  } catch {
    return "dark"
  }
}

const initialState: UiState = {
  theme: getInitialTheme(),
  sidebarOpen: true,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})


export const { toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
