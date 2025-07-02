import { useLocation } from "react-router";
import SupportChatHeader from "../../components/custom/Support/SupportChatHeader";
import SupportChatMain from "../../components/custom/Support/SupportChatMain";

const SupportChat = () => {
  const location = useLocation();
  const supportId = location?.state?.supportId;
  const name = location?.state?.name;
  console.log("USERID PRESENT IN SUPPORT", supportId, name);

  return (
    <div>
      <SupportChatHeader userName={name} />
      <SupportChatMain supportId={supportId} />
    </div>
  );
};

export default SupportChat;
