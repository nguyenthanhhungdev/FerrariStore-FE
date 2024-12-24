// src/hooks/useFetchData.ts
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../service/api/fetchData";

const useFetchData = <T>(endpoint: string, queryKey?: string | string[]) => {
  return useQuery<T, Error>({
    queryKey: [queryKey],
    queryFn: () => fetchData(endpoint),
  });
};

export default useFetchData;
