import axiosInstance from "../axiosInstance";

// Service for raising the support request for all user roles
export const salesRaiseSupport = async (data, userId) => {
  try {
    const response = await axiosInstance.post("/support/raiseTicket", {
      name: data?.name,
      userId,
      email: data?.email,
      phone: data?.phone,
      department: data?.department,
      query: data?.query,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Service for fetching support list for all user roles
export const fetchSupport = async (page) => {
  try {
    const response = await axiosInstance.get(`/support/tickets/${page}`);
    console.log("Fetched Support List", response?.data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUserDetails = async () => {
  try {
    const response = await axiosInstance.get(`/user/getuserdetails`);
    console.log("Get User Details", response?.data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Service for sending mail
export const sendMail = async (eventId, clientId) => {
  try {
    const response = await axiosInstance.post(
      `/event/sendMailToClient/${eventId}/${clientId}`
    );
    console.log("Mail Send Successfully");
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
