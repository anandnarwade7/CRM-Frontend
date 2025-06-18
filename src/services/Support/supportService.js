import axiosInstance from "../axiosInstance";

export const salesRaiseSupport = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/support/raiseTicket",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error While raise support", error);
  }
};
