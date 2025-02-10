import { useLocation } from "react-router";

export const useLastPathSegment = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1] || "";
};
