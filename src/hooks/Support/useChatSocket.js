import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { socketUrl } from "../../utils/constant";

const useChatSocket = (supportId) => {
  const [messages, setMessages] = useState([]);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${socketUrl}/ws`);
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        if (stompClientRef.current) return;

        stompClient.subscribe(`/topic/chats/${supportId}`, (message) => {
          console.log("New MSG", message);

          const newMessages = Array.isArray(JSON.parse(message.body))
            ? JSON.parse(message.body)
            : [JSON.parse(message.body)];

          setMessages((prevMessages) => {
            const mergedMessages = [
              ...prevMessages,
              ...newMessages.filter(
                (newMsg) => !prevMessages.some((msg) => msg.id === newMsg.id)
              ),
            ];
            return mergedMessages;
          });
        });

        stompClient.send(
          "/app/getchatsBySupportId",
          {},
          JSON.stringify({ supportId })
        );

        stompClientRef.current = stompClient;
      });
    };

    connectWebSocket();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
        stompClientRef.current = null;
      }
    };
  }, [supportId]);

  const sendMessage = (messagePayload) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send(
        "/app/addchat",
        {},
        JSON.stringify(messagePayload)
      );
    }
  };

  return { messages, sendMessage };
};

export default useChatSocket;
