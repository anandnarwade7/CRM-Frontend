import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import axiosInstance from "../axiosInstance";

// Service for fetching only sales person
export const getSales = async (role) => {
  try {
    const response = await axiosInstance.get(`/user/getSales/${role}`);
    console.log("Getting sales", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching sales", error);
  }
};

// Service for Getting the Leads Table Data
export const getLeads = async (page, status) => {
  try {
    const response = await axiosInstance.get(`/import/assigned`, {
      params: {
        page,
        status,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching Leads Table Data", error);
  }
};

// Service for getting leads by Id
export const getLeadsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/import/getLeadsById/${id}`);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Leads Id", error);
  }
};

// Service for getting sales person leads data
export const getSalesLeads = async (userId, page) => {
  try {
    const response = await axiosInstance.get(`/import/leads`, {
      params: {
        userId: userId,
        page: page,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching Sales Leads", error);
  }
};

// Service for Downloading the template while assigning the leads
export const getDownloadTemplate = async () => {
  try {
    const response = await axiosInstance.get(`/import/download-template`, {
      responseType: "blob",
    });
    return response?.data;
  } catch (error) {
    console.log("Error fetching Sales Leads", error);
  }
};
