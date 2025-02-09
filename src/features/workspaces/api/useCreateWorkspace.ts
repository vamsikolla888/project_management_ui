"use client"
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>;
type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces.$post({ form });
      const result = await response.json();
      return result;
    },
    onSuccess: (resp) => {
      console.log("RESP", resp);
      toast.success("Workspaces created successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"]})
    }
  })

  return mutation;
}