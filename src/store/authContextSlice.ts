import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MenuNode, UserUnit } from "@/features/auth/authTypes";
import type { RootState } from "@/store";

interface AuthState {
  userId: number | null;
  companyId: number | null;
  unitId: number | null;
  units: UserUnit[];
  menus: MenuNode[];
}

const initialState: AuthState = {
  userId: null,
  companyId: null,
  unitId: null,
  units: [],
  menus: [],
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthContext(
      state,
      action: PayloadAction<{
        userId: number;
        companyId: number;
        unitId: number;
      }>
    ) {
      state.userId = action.payload.userId;
      state.companyId = action.payload.companyId;
      state.unitId = action.payload.unitId;
    },

    setUnits(state, action: PayloadAction<UserUnit[]>) {
      state.units = action.payload;
    },

    setMenus(state, action: PayloadAction<MenuNode[]>) {
      state.menus = action.payload;
    },

    setActiveUnit(state, action: PayloadAction<{ unitId: number }>) {
      state.unitId = action.payload.unitId;
    },

    clearAuthContext(state) {
      state.userId = null;
      state.companyId = null;
      state.unitId = null;
      state.units = [];
      state.menus = [];
    },
  },
});

export const {
  setAuthContext,
  setUnits,
  setMenus,
  setActiveUnit,
  clearAuthContext,
} = slice.actions;

export default slice.reducer;

// ✅ Typed Selectors
export const selectUserId = (state: RootState) => state.authContext.userId;
export const selectCompanyId = (state: RootState) => state.authContext.companyId;
export const selectUnitId = (state: RootState) => state.authContext.unitId;
export const selectUnits = (state: RootState) => state.authContext.units;
export const selectMenus = (state: RootState) => state.authContext.menus;
