import React, { useState } from 'react';
import "./ChatInput.css";
import { useStateValue } from './StateProvider';
import message from './message';
import { Timestamp } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

export default function ChatInput({channelName, channelid}) {
    const [input, setInput] = useState('');
    const [{ user}] = useStateValue();
   const sendMessage = e => {
        e.preventDefault();

   };
  return (
    <div className='chatinput'>
        <form>
            <input 
            

            placeholder='{Message #${channelName?.toLowerCase()}}'/>
            <button type='submit'onClick={sendMessage}>SEND</button>
        </form>
    </div>
  );
}
   
