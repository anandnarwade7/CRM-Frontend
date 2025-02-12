import axios from "axios";
import { BASE_URL } from "../../utils/constant";

// Service for fetching only sales person
export const getSales = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getSales`, {
      withCredentials: true,
    });
    console.log("Getting sales", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching sales", error);
  }
};
