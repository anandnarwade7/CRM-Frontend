import { useQuery } from "@tanstack/react-query";
import { getCRM } from "../../services/Client/clientService";

export const useGetCRM = (role) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["CRM"],
    queryFn: () => getCRM(role),
  });

  return { data, error, isLoading };
};
