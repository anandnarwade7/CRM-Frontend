import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useUserId } from "../../hooks/use-user-id";

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

export const getAdmins = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getadmins?page=1`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("Error Fetching Admins", error);
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
