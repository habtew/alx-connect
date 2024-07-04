import { useState } from "react";
import { auth } from "../../../lib/firebase"; // Adjust the import path as needed
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./userInfo.css";

const Userinfo = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { currentUser } = useUserStore();
  const { resetChat } = useChatStore();

  const handleMoreClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

     const handleVideoClick = () => {
        toast.error("function not implemented yet");
      };
    
      const handleEditClick = () => {
        toast.error("function not implemented yet");
      };

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" onClick={handleMoreClick} />
        <img src="./video.png" alt="" onClick={handleVideoClick}/>
        <img src="./edit.png" alt="" onClick={handleEditClick}/>
        {showLogout && (
          <div className="logout-option" onClick={handleLogout}>
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Userinfo;