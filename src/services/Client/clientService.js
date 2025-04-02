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
export const getClients = async (page, status = "CONVERTED") => {
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

// Service for getting Clients by Id
export const getClientLeadById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/clients/getById/${id}`, {
      withCredentials: true,
    });

    return response?.data;
  } catch (error) {
    console.log("Error fetching Leads Id", error);
  }
};

// Service for Adding the Client
export const addClient = async (id, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/addclient/${id}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    console.log("Error while creating the Client", error);
  }
};

// Service for Getting Clients List added by CR Managers
export const getClientsList = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getclients`, {
      params: {
        role: "CLIENT",
        userId,
      },
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("Error While fetching the Clients List", error);
  }
};

// Service for getting converted leads
export const getConvertedLeads = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/import/convertedleads`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("Error While fetching the Converted Leads", error);
  }
};

// Service Upload Docs for CR Manager
export const uploadDocs = async (id, formData) => {
  try {
    const resposne = await axios.put(
      `${BASE_URL}/clients/uploaddocs/${id}`,
      formData,
      { withCredentials: true }
    );
    return resposne?.data;
  } catch (error) {
    console.log("Error While Uploading the Documents", error);
  }
};
