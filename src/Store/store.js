import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "../Store/Slices/Leads/leadsSlice";
import supportReducer from "../Store/Slices/Support/supportSlice";

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    support: supportReducer,
  },
});
