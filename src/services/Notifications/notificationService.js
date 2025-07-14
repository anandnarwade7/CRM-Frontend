import axiosInstance from "../axiosInstance";

// Service for getting all notifications
export const fetchNotifications = async () => {
  try {
    const response = await axiosInstance.get(`/notifications/all`);
    console.log("NOtification", response?.data);

    return response?.data;
  } catch (error) {
    console.log("Get Notification Error", error);
    throw new Error(error);
  }
};

// Service for delete single notification
export const deleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(`/notifications/${id}`);
    return response?.data;
  } catch (error) {
    console.log("Delete Single Notification Error", error);
    throw new Error(error);
  }
};
// Service for delete single notification
export const deleteAllNotifications = async () => {
  try {
    const response = await axiosInstance.delete(`/notifications/deleteall`);
    return response?.data;
  } catch (error) {
    console.log("Delete All Notification Error", error);
    throw new Error(error);
  }
};

// Service for getting notification count
export const fetchNotificationCount = async () => {
  try {
    const response = await axiosInstance.get(`/notifications/unseen`);
    console.log("Notification Count Response", response?.data);
    return response?.data;
  } catch (error) {
    console.log("Notification Count Error", error);
    throw new Error(error);
  }
};
