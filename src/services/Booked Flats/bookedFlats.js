import axiosInstance from "../axiosInstance";

export const getBookedFlats = async () => {
  try {
    const resposne = await axiosInstance.get(`/project/getbookedflats`);
    return resposne?.data;
  } catch (error) {
    console.log("Error While Fetching Booked Flats", error);
  }
};
