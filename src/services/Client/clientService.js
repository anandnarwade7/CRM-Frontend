import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import axiosInstance from "../axiosInstance";

// Service for fetching only CR Managers
export const getCRM = async (role) => {
  try {
    const response = await axiosInstance.get(`/user/getSales/${role}`);
    return response?.data;
  } catch (error) {
    console.log("Error fetching sales", error);
  }
};

// Service for Export / Download Excel File while assigning the leads
export const getExportClientLead = async () => {
  try {
    const response = await axiosInstance.get(`/import/export`, {
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
    const response = await axiosInstance.get(`/clients/listbystatus`, {
      params: {
        page,
        status,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("Error Getting Data", error);
  }
};

// Service for getting Clients by Id
export const getClientLeadById = async (id) => {
  try {
    const response = await axiosInstance.get(`/clients/getById/${id}`);

    return response?.data;
  } catch (error) {
    console.log("Error fetching Leads Id", error);
  }
};

// Service for Adding the Client
export const addClient = async (id, formData) => {
  try {
    const response = await axiosInstance.post(
      `/user/addclient/${id}`,
      formData
    );
    return response?.data;
  } catch (error) {
    console.log("Error while creating the Client", error);
  }
};

// Service for Getting Clients List added by CR Managers
export const getClientsList = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/getclients`, {
      params: {
        role: "CLIENT",
        userId,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("Error While fetching the Clients List", error);
  }
};

// Service for getting converted leads
export const getConvertedLeads = async () => {
  try {
    const response = await axiosInstance.get(`/import/convertedleads`);
    return response?.data;
  } catch (error) {
    console.log("Error While fetching the Converted Leads", error);
  }
};

// Service Upload Docs for CR Manager
export const uploadDocs = async (id, formData) => {
  try {
    const resposne = await axiosInstance.put(
      `/clients/uploaddocs/${id}`,
      formData
    );
    return resposne?.data;
  } catch (error) {
    console.log("Error While Uploading the Documents", error);
  }
};

// Service for geeting event details for client user
export const getClientShowEvents = async (leadId) => {
  try {
    const response = await axiosInstance.get(
      `/event/getalleventdetails/${leadId}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error While Getting Event Details", error);
  }
};
