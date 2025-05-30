import axios from "axios";
import axiosInstance from "../axiosInstance";
import { BASE_URL } from "../../utils/constant";

// Service for creating the project
export const createProject = async (userId, data) => {
  try {
    const response = await axiosInstance.post(`/project/create/${userId}`, {
      propertyName: data?.propertyName,
      address: data?.address,
    });
    return response?.data;
  } catch (error) {
    console.log("Failed to create the project", error);
    throw new Error(
      error?.response?.data?.message ||
        "Something went wrong while creating Inventory"
    );
  }
};

// Service for creating for the towers
export const createTowers = async (towerPayload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/project/tower/create`,
      towerPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.log("Failed to create the Tower", error);
    throw new Error(
      error?.response?.data?.message ||
        "Something went wrong while creating Towers"
    );
  }
};

// Service for getting the all project list
export const getProjects = async (page) => {
  try {
    const response = await axiosInstance.get(`/project/details/${page}`);
    return response?.data;
  } catch (error) {
    console.log("Failed to Fetch Project Details", error);
    throw new Error(error?.response?.data?.message || "Failed to Fetch");
  }
};

// Service for getting the Towers list for Select Dropdown
export const getTowerDetails = async (projectId) => {
  try {
    const response = await axiosInstance.get(
      `/project/towerdetails/${projectId}`
    );
    return response?.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to Fetch");
  }
};

// Service for getting the flats details when tower changes
export const getFlatsDetails = async (towerId) => {
  try {
    const response = await axiosInstance.get(
      `/project/flatsdetails/${towerId}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error while fetching flats Details", error);
    throw new Error(error?.response?.data?.message || "Failed to Fetch");
  }
};

// Service for Updating the Flat Status
export const updateFlatStatus = async (flatId, data) => {
  try {
    const response = await axiosInstance.put(`/project/update/${flatId}`, data);
    return response?.data;
  } catch (error) {
    console.log("Error Updating the Flat Status", error);
    throw new Error(error?.response?.data?.message || "Failed to Update");
  }
};

// Service for getting area details for updating the square feet
export const getAreaDetailsForUpdate = async (projectId, towerId) => {
  try {
    const response = await axiosInstance.get(
      `/project/gettower/${projectId}/${towerId}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error while fetching the details about update", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch");
  }
};

// Service for update the sq ft for specific tower and project
export const updateFlatSqFt = async (towerId, areas) => {
  try {
    const response = await axiosInstance.put(
      `/project/update-flats/${towerId}`,
      areas
    );

    return response?.data;
  } catch (error) {
    console.log("Error while update the square foot for floors", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch");
  }
};

// Service for get the flat details by id
export const getFlatById = async (flatId) => {
  try {
    const response = await axiosInstance.get(`/project/get/${flatId}`);
    return response?.data;
  } catch (error) {
    console.log("Error while Get the Flat Details", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch");
  }
};

// Service for getting list of clients under the CR Manager
export const getClientsByCRM = async () => {
  try {
    const response = await axiosInstance.get(`/user/getclientsusers`);
    return response?.data;
  } catch (error) {
    console.log("Error while Get the clients under the CRM", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch");
  }
};

// Service for getting the layout Image
export const getLayoutImage = async (towerId) => {
  try {
    const response = await axiosInstance.get(
      `/project/gettowersdetails/${towerId}`
    );

    return response?.data;
  } catch (error) {
    console.log("Error while Get the Layout Image", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch");
  }
};
