import axios from "axios";
import { BASE_URL } from "../../utils/constant";

// Service for fetching Admin Dashboard Data
export const adminDashboardService = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getUsersCountByRole`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("Admin Dashboard Error", error);
    throw new Error(error?.response?.data?.message || "Failed to Fetch");
  }
};

// Service for fetching Sales Person Dashboard Data
export const salesDashboardService = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/import/getLeadsCount?userId=${userId}`,
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    console.log("Sales Dashboard Error", error);
  }
};
