import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { data } from "autoprefixer";

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

// Service for Getting the Leads Table Data
export const getLeads = async (page, status) => {
  try {
    const response = await axios.get(`${BASE_URL}/import/assigned`, {
      params: {
        page,
        status,
      },
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching Leads Table Data", error);
  }
};
