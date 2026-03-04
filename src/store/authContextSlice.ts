//path store/authContextSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MenuNode, UserUnit ,UserCompany } from "@/features/auth/authTypes";
import type { RootState } from "@/store";

interface AuthState {
  userId: number | null;
  companyId: number | null;
  unitId: number | null;
  companies: UserCompany[];
  units: UserUnit[];
  menus: MenuNode[];
  formMode: "ADD" | "EDIT" | "VIEW";   // ✅ NEW
}

const initialState: AuthState = {
  userId: null,
  companyId: null,
  unitId: null,
  companies:[],
  units: [],
  menus: [],
  formMode:"ADD" // ✅ NEW
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
    setCompanies(state, action: PayloadAction<UserCompany[]>) {
      state.companies = action.payload;
    },

    setActiveCompany(
      state,
      action: PayloadAction<{ companyId: number }>
    ) {
      state.companyId = action.payload.companyId;
      state.unitId = null;
      state.units = [];
      state.menus = [];
    },

    setUnits(state, action: PayloadAction<UserUnit[]>) {
      state.units = action.payload;
    },

    setMenus(state, action: PayloadAction<MenuNode[]>) {
      state.menus = action.payload;
    },
    clearAuthContext(state) {
      state.userId = null;
      state.companyId = null;
      state.unitId = null;
      state.units = [];
      state.menus = [];
    },
    setFormMode(
      state,
      action: PayloadAction<"ADD" | "EDIT" | "VIEW">
    ) {
      state.formMode = action.payload;
    },
  },
});

export const {
  setAuthContext,
  setCompanies,
  setUnits,
  setMenus,
  clearAuthContext,
  setActiveCompany,
  setFormMode, 
} = slice.actions;
export default slice.reducer;

// ✅ Typed Selectors
export const selectUserId = (state: RootState) => state.authContext.userId;
export const selectCompanyId = (state: RootState) => state.authContext.companyId;
export const selectCompanies = (state: RootState) => state.authContext.companies;
export const selectMenus = (state: RootState) => state.authContext.menus;
export const selectFormMode = (state: RootState) =>state.authContext.formMode;