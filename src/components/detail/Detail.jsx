





// import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { useChatStore } from "../../lib/chatStore";
// import { auth, db } from "../../lib/firebase";
// import { useUserStore } from "../../lib/userStore";
// import "./detail.css";

// const Detail = () => {
//   const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
//     useChatStore();
//   const { currentUser } = useUserStore();
//   const [photos, setPhotos] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       if (!chatId) return;

//       setIsLoading(true);

//       try {
//         const chatRef = doc(db, "chats", chatId);
//         const chatSnap = await getDoc(chatRef);

//         if (chatSnap.exists()) {
//           const chatData = chatSnap.data();
//           const chatMessages = chatData.messages || [];

//           const chatPhotos = chatMessages
//             .filter((message) => message.img) // Filter messages that contain images
//             .map((message) => ({
//               img: message.img,
//               name: message.text || 'Unnamed Photo', // Default name if text is not provided
//             }));

//           console.log("Fetched photos:", chatPhotos); // Log fetched photos for debugging

//           setPhotos(chatPhotos);
//         } else {
//           console.log("Chat snapshot does not exist.");
//           setPhotos([]); // Set photos to empty array if chat snapshot does not exist
//         }
//       } catch (err) {
//         console.error("Error fetching photos:", err); // Log error for debugging
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPhotos();

//     const unsubscribe = onSnapshot(doc(db, "chats", chatId), () => {
//       fetchPhotos();
//     });

//     return () => unsubscribe();
//   }, [chatId]);

//   const handleBlock = async () => {
//     if (!user) return;

//     const userDocRef = doc(db, "users", currentUser.id);

//     try {
//       await updateDoc(userDocRef, {
//         blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
//       });
//       changeBlock();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleLogout = () => {
//     auth.signOut();
//     resetChat();
//   };

//   const toggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   return (
//     <div className="detail">
//       <div className="user">
//         <img src={user?.avatar || "./avatar.png"} alt="" />
//         <h2>{user?.username}</h2>
//         <p>Lorem ipsum dolor sit amet.</p>
//       </div>
//       <div className="info">
//         <div className="option">
//           <div className="title" onClick={toggleExpand}>
//             <span>Shared photos</span>
//             <img src={isExpanded ? "./arrowDown.png" : "./arrowUp.png"} alt="" />
//           </div>
//           {isExpanded && (
//             <div className="photos">
//               {isLoading ? (
//                 <p>Loading...</p>
//               ) : photos.length > 0 ? (
//                 photos.map((photo, index) => (
//                   <div className="photoItem" key={index}>
//                     <div className="photoDetail">
//                       <img src={photo.img} alt={photo.name} />
//                       <span>{photo.name}</span>
//                     </div>
//                     <img src="./download.png" alt="" className="icon" />
//                   </div>
//                 ))
//               ) : (
//                 <p>No photos available</p>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Chat Settings</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Privacy & help</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Shared Files</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>
//         <button onClick={handleBlock}>
//           {isCurrentUserBlocked
//             ? "You are Blocked!"
//             : isReceiverBlocked
//             ? "User blocked"
//             : "Block User"}
//         </button>
//         <button className="logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Detail;

import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();
  const [photos, setPhotos] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!chatId) return;

      setIsLoading(true);

      try {
        const chatRef = doc(db, "chats", chatId);
        const chatSnap = await getDoc(chatRef);

        if (chatSnap.exists()) {
          const chatData = chatSnap.data();
          const chatMessages = chatData.messages || [];

          const chatPhotos = chatMessages
            .filter((message) => message.img) // Filter messages that contain images
            .map((message) => ({
              img: message.img,
              name: message.text || 'Unnamed Photo', // Default name if text is not provided
            }));

          console.log("Fetched photos:", chatPhotos); // Log fetched photos for debugging

          setPhotos(chatPhotos);
        } else {
          console.log("Chat snapshot does not exist.");
          setPhotos([]); // Set photos to empty array if chat snapshot does not exist
        }
      } catch (err) {
        console.error("Error fetching photos:", err); // Log error for debugging
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();

    const unsubscribe = onSnapshot(doc(db, "chats", chatId), () => {
      fetchPhotos();
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title" onClick={toggleExpand}>
            <span>Shared photos</span>
            <img src={isExpanded ? "./arrowDown.png" : "./arrowUp.png"} alt="" />
          </div>
          {isExpanded && (
            <div className="photos">
              {isLoading ? (
                <p>Loading...</p>
              ) : photos.length > 0 ? (
                photos.map((photo, index) => (
                  <div className="photoItem" key={index}>
                    <div className="photoDetail">
                      <img src={photo.img} alt={photo.name} />
                      <span>{photo.name}</span>
                    </div>
                    {/* Optionally include download icon */}
                    {/* <img src="./download.png" alt="" className="icon" /> */}
                  </div>
                ))
              ) : (
                <p>No photos available</p>
              )}
            </div>
          )}
        </div>
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
