import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import axiosInstance from "../axiosInstance";

// Service for add the new User.
export const addSalesPerson = async (userId, formData) => {
  try {
    const response = await axiosInstance.post(
      `/user/addUser/${userId}`,
      formData
    );
    return response?.data;
  } catch (error) {
    console.log("Error while creating the user", error);
    throw new Error("Failed to Create the User");
  }
};

// service for Getting the users.
export const fetchUsers = async (role, page = 1) => {
  try {
    const response = await axiosInstance.get(`/user/getUsers`, {
      params: {
        role,
        page,
      },
    });
    return response?.data;
  } catch (error) {
    console.log("Error Fetching Users", error);

    throw new Error(
      error?.response?.data?.message || `Failed to Fetch:${role}`
    );
  }
};

// Service for getting Page size for Users.
export const fetchUserPageCount = async (role) => {
  try {
    const response = await axiosInstance.get(`/user/getCountByRole/${role}`);

    return response?.data;
  } catch (error) {
    console.log("Error while fetching the page size of the user", error);
  }
};

// Service for updating the User Status (Block and unBlock)
export const userActionStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/user/updateUser/${id}/${status}`,
      {}
    );
    console.log("User Action Status Updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user action status:", error);
    throw error;
  }
};

// Service for Update the User Details
export const updateUserDetails = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `/user/addDetails/${id}`,
      formData
    );

    console.log("Update the User Details", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error updating user Details", error);
    throw error;
  }
};
