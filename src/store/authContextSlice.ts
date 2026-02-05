import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthContextState {
    userId: number | null;
    companyId: number | null;
    unitId: number | null;
    isInitialized: boolean;
}

const initialState: AuthContextState = {
    userId: null,
    companyId: null,
    unitId: null,
    isInitialized: false,
};

const authContextSlice = createSlice({
    name: "authContext",
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
            state.isInitialized = true;
        },
        setActiveUnit(
            state,
            action: PayloadAction<{ unitId: number }>
        ) {
            state.unitId = action.payload.unitId;
            localStorage.setItem(
                "activeUnitId",
                action.payload.unitId.toString()
            );
        },
        clearAuthContext(state) {
            state.userId = null;
            state.companyId = null;
            state.unitId = null;
            state.isInitialized = false;
        },

    },
});





export const { setAuthContext, clearAuthContext, setActiveUnit } =
    authContextSlice.actions;

export default authContextSlice.reducer;
