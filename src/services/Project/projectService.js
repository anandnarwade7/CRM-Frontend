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
          "Content-Type": "application/json",
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
