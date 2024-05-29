import { QueryClient, useMutation } from "@tanstack/react-query";
import { requestMentorship as requestMentorshipApi } from "../../services/apiMembers";

export default function useRequestMembership() {
  const queryClient = new QueryClient();
  const { mutate: requestMentorship, isLoading } = useMutation({
    mutationFn: requestMentorshipApi,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (faculty) => {
      console.log(faculty);
      queryClient.setQueryData(["requested"], faculty);
    },
  });
  return { requestMentorship, isLoading };
}
