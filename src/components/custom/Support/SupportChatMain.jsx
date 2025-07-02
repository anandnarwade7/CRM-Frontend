import React, { useEffect, useRef, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Paperclip, Send } from "lucide-react";
import io from "socket.io-client";
import { useUserId } from "../../../hooks/use-user-id";
import { useToast } from "@/hooks/use-toast";
const socket = io("http://localhost:9092");

const SupportChatMain = ({ supportId }) => {
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);
  const [chat, setChat] = useState([]);
  const { toast } = useToast();

  const userId = useUserId();

  const socketRef = useRef(null);

  // 1 st comment
  // useEffect(() => {
  //   socket.connect();

  //   socket.on("connect", () => {
  //     socket.emit("getChatsBySupportId", { supportId: supportId });
  //   });

  //   socket.on(`chat-${supportId}`, (receivedMessages) => {
  //     console.log("GET CHAT MSG", receivedMessages);

  //     setChat(receivedMessages);
  //   });

  //   socket.on(`new-chat-${supportId}`, (newMessage) => {
  //     setChat((prevMessages) => [...prevMessages, newMessage]);
  //   });

  //   socket.emit("getChatsBySupportId", { supportId: supportId });

  //   socket.on("message", (newMessage) => {
  //     console.log("shivraj message", newMessage);
  //   });

  //   const messageListener = (newMessage) => {
  //     setChat((prevMessages) => [...prevMessages, newMessage]);
  //   };

  //   socket.on("addChat", messageListener);

  //   socket.on("disconnect", () => {
  //     console.log("User disconnected");
  //   });

  //   return () => {
  //     socket.off("addChat", messageListener);
  //     socket.disconnect();
  //   };
  // }, []);

  // 2nd comment
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socet Connected");

      socket.emit("getChatsBySupportId", { supportId });
    });

    socket.on(`chat-${supportId}`, (receivedMessages) => {
      console.log("Get MSG", receivedMessages);
      setChat(receivedMessages || []);
    });

    socket.on(`new-chat-${supportId}`, (newMessage) => {
      console.log("New chat received", newMessage); // ✅ must log
      setChat([...newMessage]);
    });

    socket.on("disconnect", () => {
      console.warn("Socket disconnected");
    });

    return () => {
      socket.disconnect(); // clean up on unmount
    };
  }, [supportId]);

  // 3 rd comment
  // useEffect(() => {
  //   socketRef.current = io("http://localhost:9092", {
  //     query: { userId: userId }, // optional
  //     transports: ["websocket"],
  //     reconnectionAttempts: 5,
  //   });

  //   const socket = socketRef.current;

  //   socket.on("connect", () => {
  //     console.log("Socket connected");
  //     socket.emit("getChatsBySupportId", { supportId });
  //   });

  //   socket.on(`chat-${supportId}`, (data) => {
  //     console.log("Initial chats", data);
  //     setChat(data);
  //   });

  //   socket.on(`new-chat-${supportId}`, (data) => {
  //     console.log("New chat list received", data);
  //     setChat(data);
  //   });

  //   socket.on("disconnect", () => {
  //     console.warn("Socket disconnected");
  //   });

  //   return () => {
  //     socket.disconnect(); // clean up on unmount
  //   };
  // }, [supportId]);

  const handleSendMessage = () => {
    if (message.trim() == "") {
      toast({
        variant: "destructive",
        title: "Unable to send Msg",
        duration: 2000,
      });
    } else {
      console.log("Actual MSG", message);
      const data = {
        supportId: supportId,
        massages: message,
        userId: userId,
      };
      console.log("ACTUAL DATA", data);

      socket.emit("addChat", data);
      // socket.emit("chat-");
      setMessage("");
      // settimeStamp(timestamps);
    }
  };

  useEffect(() => {
    if (messageEndRef?.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [chat]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  console.log("Frontend Chat msg", chat);

  return (
    <div>
      {/* Message Area */}
      <div
        className="flex flex-col gap-4 overflow-y-scroll mt-4 p-4 h-[66vh]"
        ref={messageEndRef}
      >
        {chat?.map((msg) => (
          <div
            className={`flex ${
              msg?.userId == userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                msg?.userId == userId
                  ? "bg-blue-500 text-white rounded-bl-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow-sm"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.chat}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Input Box */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12 py-5 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {/* <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Paperclip className="w-4 h-4" />
            </Button> */}
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!message?.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChatMain;
