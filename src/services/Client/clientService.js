import axios from "axios";
import { BASE_URL } from "../../utils/constant";

// Service for fetching only CR Managers
export const getCRM = async (role) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getSales/${role}`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching sales", error);
  }
};

// Service for Export / Download Excel File while assigning the leads
export const getExportClientLead = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/import/export`, {
      responseType: "blob",
    });
    return response?.data;
  } catch (error) {
    console.log("Error Download Client Export", error);
  }
};

// Service for Getting Clients Table Data
export const getClients = async (page = 1, status = "CONVERTED") => {
  try {
    const response = await axios.get(`${BASE_URL}/clients/listbystatus`, {
      params: {
        page,
        status,
      },
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("Error Getting Data", error);
  }
};
