import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { NotificationIcon } from "../../assets/index";
import { Button } from "../ui/button";
import { Loader2, X } from "lucide-react";
import { useGetNotifications } from "../../hooks/Notifications/useGetNotifications";
import { useDeleteNotification } from "../../hooks/Notifications/useDeleteNotification";
import { useGetNotificationCount } from "../../hooks/Notifications/useGetNotificationCount";
import { Badge } from "../ui/badge";
import { useQueryClient } from "@tanstack/react-query";

const NotificationCard = ({ data, handleDeleteNotification }) => {
  return (
    // Main Container
    <div className="my-10">
      <div className="w-full flex justify-between">
        <p>{data?.message}</p>
        <div>
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={() => handleDeleteNotification(data?.id)}
          >
            <X />
          </Button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="bg-main-secondary mt-2 text-white max-w-full w-28">
          View
        </Button>
      </div>
    </div>
  );
};

const Notification = ({ styles }) => {
  const userEmail = sessionStorage.getItem("email");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useGetNotifications(userEmail);

  const { notificationCount, notificationCountLoading, notificationCountErr } =
    useGetNotificationCount();

  console.log(
    "Notification Count",
    notificationCount,
    notificationCountLoading
  );

  const { handleDeleteNotification, handleDeleteAllNotifications } =
    useDeleteNotification();

  return (
    <div className={`flex items-center justify-end ${styles}`}>
      <Sheet>
        <SheetTrigger
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ["notificationCount"],
            });
          }}
        >
          <div className="relative">
            <img src={NotificationIcon} className="w-6 h-6" />

            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 p-0 rounded-full text-white text-xs flex items-center justify-center">
                {notificationCount}
              </Badge>
            )}
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-main-grey font-medium text-2xl mb-6">
              Notifications
            </SheetTitle>
            <SheetDescription>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xl font-medium text-main-label">Today</p>
                {data?.length !== 0 && (
                  <Button
                    className="text-main-secondary bg-transparent"
                    onClick={handleDeleteAllNotifications}
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </SheetDescription>
            {isLoading && <Loader2 className="animate-spin" size={6} />}
            {data?.length == 0 ? (
              <p>No notifications available</p>
            ) : (
              <div className="h-[70vh] overflow-y-scroll">
                {data?.map((notification) => {
                  return (
                    <NotificationCard
                      key={notification?.id}
                      data={notification}
                      handleDeleteNotification={handleDeleteNotification}
                    />
                  );
                })}
              </div>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Notification;
