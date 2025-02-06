import axios from "axios";
import { BASE_URL } from "../../utils/constant";

export const loginUser = async (loginData) => {
  const response = await axios.post(`${BASE_URL}/user/login`, loginData, {
    withCredentials: true,
  });
  return response.data;
};
