import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import axiosInstance from "../axiosInstance";

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post(`/user/login`, loginData);
  return response.data;
};
