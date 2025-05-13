import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useLayoutImageHandler = () => {
  const [layoutImgUrl, setLayoutImgUrl] = useState(null);
  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleLayoutImg = async (imgUrl) => {
    try {
      const res = await axios.get(imgUrl, {
        responseType: "blob",
      });

      if (res) {
        const blob = new Blob([res.data], {
          type: res.headers["Content-Type"],
        });
        const imageUrl = URL.createObjectURL(blob);
        setLayoutImgUrl(imageUrl);
        setIsLayoutDialogOpen(true);
      }
    } catch (error) {
      console.log("Error While Fetching Layout Img", error);
      toast({
        variant: "destructive",
        title: "Unable to render layout Image",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (layoutImgUrl) {
        URL.revokeObjectURL(layoutImgUrl);
      }
    };
  }, [layoutImgUrl]);

  return {
    layoutImgUrl,
    isLayoutDialogOpen,
    setIsLayoutDialogOpen,
    handleLayoutImg,
  };
};
