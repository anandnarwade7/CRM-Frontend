import axios from "axios";
import { BASE_URL } from "../../utils/constant";

// Service for add the new User.
export const addSalesPerson = async (userId, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/addUser/${userId}`,
      formData,
      {
        withCredentials: true,
      }
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
    const response = await axios.get(`${BASE_URL}/user/getUsers`, {
      params: {
        role,
        page,
      },
      withCredentials: true,
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
    const response = await axios.get(
      `${BASE_URL}/user/getCountByRole/${role}`,
      {
        withCredentials: true,
      }
    );

    return response?.data;
  } catch (error) {
    console.log("Error while fetching the page size of the user", error);
  }
};

// Service for updating the User Status (Block and unBlock)
export const userActionStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/updateUser/${id}/${status}`,
      {},
      { withCredentials: true }
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
    const response = await axios.put(
      `${BASE_URL}/user/addDetails/${id}`,
      formData,
      { withCredentials: "true" }
    );

    console.log("Update the User Details", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error updating user Details", error);
    throw error;
  }
};
