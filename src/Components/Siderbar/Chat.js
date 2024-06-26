import React, { useEffect, useState } from 'react';
import "./Chat.css";
import Message from './message'; 
import { useParams } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import db from '../../firebase'; 
import ChatInput from './ChatInput';

export default function Chat() {
  const { channelid } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);


  useEffect(() => {
    if (channelid) {
      const unsubscribeRoomDetails = db.collection('channels').doc(channelid)
        .onSnapshot(snapshot => (
          setRoomDetails(snapshot.data())
        ));

      const unsubscribeRoomMessages = db.collection('channels')
        .doc(channelid)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setRoomMessages(snapshot.docs.map((doc) => doc.data()))
        );

      // Cleanup the subscriptions on unmount
      return () => {
        unsubscribeRoomDetails();
        unsubscribeRoomMessages();
      };
    }
  }, [channelid]);

  console.log(roomDetails);
  console.log("MESSAGES >>>", roomMessages);

  return (
    <div className='chat'>
      <div className='chat_header'>
        <div className='chat_headerLeft'>
          <h4 className='chat_channelName'>
            <strong>#Cohort-16</strong>
            <StarBorderIcon />
          </h4>
        </div>
        <div className='chat_headertRight'>
          <p>
            <InfoIcon /> Details
          </p>
        </div>
      </div>
      <div className="chat-messages">
        {roomMessages.map(({ message, timestamp, user, userImage }, index) => (
          <Message
            key={index}
            message={message}
            timestamp={timestamp}
            user={user}
           
            userImage={userImage}

          />
        ))}
      </div>
      <ChatInput channelName = { roomDetails?.name} channelid />
    </div>
  );
}

