import { createSlice } from "@reduxjs/toolkit";

export const supportSlice = createSlice({
  name: "support",
  initialState: {
    adminToggle: false,
  },
  reducers: {
    setAdminToggle: (state) => {
      state.adminToggle = !state.adminToggle;
    },
  },
});

// Export the action and the reducer
export const { setAdminToggle } = supportSlice.actions;
export default supportSlice.reducer;
