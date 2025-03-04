import { createSlice } from "@reduxjs/toolkit";

// Create a slice for leads
export const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    status: "ASSIGNED", // Initial status
  },
  reducers: {
    // Reducer function to update the status
    setStatus: (state, action) => {
      state.status = action.payload; // Update the status with the action payload
    },
  },
});

// Export the action and the reducer
export const { setStatus } = leadsSlice.actions;
export default leadsSlice.reducer;
