import axiosInstance from "../axiosInstance";

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
