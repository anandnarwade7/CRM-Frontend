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
