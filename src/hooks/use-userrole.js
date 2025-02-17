import { useEffect, useState } from "react";

export const useUserRole = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  return userRole;
};
