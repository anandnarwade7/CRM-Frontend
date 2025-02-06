export const useUserId = () => {
  const userId = sessionStorage.getItem("userId");

  if (!userId) {
    throw new Error("User ID not found in session storage");
  }

  return userId;
};
