import axios from "axios";
import { BASE_URL } from "../../utils/constant";

// Service for add the new User.
export const addSalesPerson = async (userId, formData) => {
  const response = await axios.post(
    `${BASE_URL}/user/addUser/${userId}`,
    formData,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

// service for Getting the users.
export const fetchUsers = async (role, page = 1) => {
  const response = await axios.get(`${BASE_URL}/user/getUsers`, {
    params: {
      role,
      page,
    },
    withCredentials: true,
  });
  return response?.data;
};

// Service for getting Page size for Users.
export const fetchUserPageCount = async (role) => {
  const response = await axios.get(`${BASE_URL}/user/getCountByRole/${role}`, {
    withCredentials: true,
  });

  return response?.data;
};
