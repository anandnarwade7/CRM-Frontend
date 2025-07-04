import { useMutation } from "@tanstack/react-query";
import { sendMail } from "../../services/Support/supportService";
import { useToast } from "@/hooks/use-toast";

export const useSendMail = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationKey: ["sendMail"],
    mutationFn: ({ eventId, clientId }) => sendMail(eventId, clientId),
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "Success",
          description: "Mail send successfully.",
          duration: 2000,
        });
      }
    },
    onError: (error) => {
      console.log("Mail Error", error?.response);

      const errorMessage =
        error?.response?.data?.developermsg || "Something went wrong";
      toast({
        variant: "destructive",
        title: error?.response?.data?.msg,
        description: errorMessage,
        duration: 2000,
      });
    },
  });

  const handleSendMail = (eventId, clientId) => {
    mutation.mutate({ eventId, clientId });
  };

  return { handleSendMail, isSending: mutation.isPending };
};
