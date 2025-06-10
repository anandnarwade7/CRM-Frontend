import { useQuery } from "@tanstack/react-query";
import { getBookedFlats } from "../../services/Booked Flats/bookedflats";

export const useGetBookedFlats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookedFlats"],
    queryFn: getBookedFlats,
  });

  return {
    data,
    isLoading,
    error,
  };
};
