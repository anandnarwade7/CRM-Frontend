import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import axiosInstance from "../axiosInstance";

// Service for fetching Admin Dashboard Data
export const adminDashboardService = async () => {
  try {
    const response = await axiosInstance.get(`/user/getUsersCountByRole`);
    return response?.data;
  } catch (error) {
    console.log("Admin Dashboard Error", error);
    throw new Error(error?.response?.data?.message || "Failed to Fetch");
  }
};

// Service for fetching Sales Person Dashboard Data
export const salesDashboardService = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/import/getLeadsCount?userId=${userId}`
    );
    return response?.data;
  } catch (error) {
    console.log("Sales Dashboard Error", error);
    throw new Error(error?.response?.data?.message || "Failed to Fetch");
  }
};

// Service for Fetching the CR Manager Dashboard Data
export const crmDashboardService = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/clients/getleadcount?userId=${userId}`
    );
    return response?.data;
  } catch (error) {
    console.log("CRM Dashboard Error", error);
    throw new Error(error?.response?.data?.message || "Failed to Fetch");
  }
};
