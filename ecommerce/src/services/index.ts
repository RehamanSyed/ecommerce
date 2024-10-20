import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import service from "./clients";

// Define the types for the props
type MutationServiceProps = {
  key: string;
  method: "get" | "post" | "put" | "delete"; // Updated "GET" to "get"
  url: string;
  onSuccessCB?: (data: unknown) => void;
};
type QueryServiceProps = {
  key: string;
  method: "get" | "post" | "put" | "delete"; // Updated "GET" to "get"
  url: string;
  onSuccessCB?: (data: unknown) => void;
};

export function useMutationService({
  key,
  url,
  method,
  onSuccessCB,
}: MutationServiceProps): {
  mutate: UseMutateFunction<unknown, Error, void, unknown>;
  status: "error" | "idle" | "success" | "pending";
} {
  const { mutate, status } = useMutation<unknown, Error, void>({
    mutationKey: [key],
    mutationFn: async () => {
      let response;
      switch (method) {
        case "get":
          response = await service.get(url);

          break;
        case "post":
          response = await service.post(url);

          break;
        case "put":
          response = await service.put(url);
          break;
        case "delete":
          response = await service.delete(url);
          break;
        default:
          throw new Error("Invalid method");
      }
      return response.data;
    },
    onSuccess: (data: unknown) => {
      console.log("Mutation success:", data);
      if (onSuccessCB) {
        onSuccessCB(data);
      }
    },
    onError: (err: Error) => {
      console.error("Mutation error:", err);
    },
  });

  return { mutate, status };
}

export function useQueryService({ key, url, method }: QueryServiceProps): {
  data: unknown | undefined;
  status: "error" | "idle" | "success" | "pending";
} {
  const { data, status } = useQuery<unknown, Error>({
    queryKey: [key],
    queryFn: async () => {
      let response;
      switch (method) {
        case "get":
          response = await service.get(url);
          break;
        default:
          throw new Error("Invalid method");
      }
      return response.data.data;
    },
  });

  return { data, status };
}
