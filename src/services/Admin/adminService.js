import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useUserId } from "../../hooks/use-user-id";

// Service for creating the new admin
export const createAdmin = async (formData) => {
  const userId = useUserId();

  try {
    const response = await axios.post(
      `${BASE_URL}/user/addadmin/${userId}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    console.log("Error When Adding Admin", error);
  }
};

// service for getting all admins list

export const getAdmins = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getadmins?page=1`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("Error Fetching Admins", error);

    throw new Error("Error Fetching Admins", error);
  }
};

// Service for Block and Unblock the Admin
export const updateAdminAction = async (userId, status) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/updateadmin/${userId}/${status}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    console.log("Error Update the Status", error);
  }
};

// service for admin by id
export const getAdminById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getAdminById/${id}`, {
      withCredentials: true,
    });

    return response?.data;
  } catch (error) {
    console.log("Error while getting admin by id", error);
  }
};

// service for updaing the admin
export const updateAdmin = async ({ id, data }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/updatedetails/${id}`,
      data,
      { withCredentials: true }
    );

    return response?.data;
  } catch (error) {
    console.log("Error While Updaing the admin", error);
  }
};
