import { CRMLogo, ProfilePic } from "../../../assets/index";
import Placeholder from "../Placeholder";

const Profile = () => {
  return (
    <div className="p-6 flex items-center gap-4">
      <div>
        <img src={ProfilePic} alt="profilepic" />
      </div>
      {/* <Placeholder /> */}
      <div>
        <img src={CRMLogo} alt="CRMLogo" className="w-[6rem]" />
      </div>
    </div>
  );
};

export default Profile;
