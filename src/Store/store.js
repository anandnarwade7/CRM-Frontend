import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "../Store/Slices/Leads/leadsSlice";

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});
