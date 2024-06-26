import React from 'react'
import "./SidebarSelect.css";
import { useHistory} from "react-router-dom";
import db  from '../../firebase'; 



export default function SidebarSelect({Icon, title, id, addChannelOption}) {
  const history = useHistory();
  const selectChannel = () => {
    if (id) {
      history.push(`/channel/${id}`)}
      else {
        history.push(title)
      }

    };

  const addChannel = () => {
    const channelName = prompt('Enter the Channel Name')
     
    if (channelName){
     db.collection('channels').add({
        name: channelName
      }) 
    }
  }; 
  
  return (
    <div className="sidebarSelect" onClick={addChannelOption ? addChannel : selectChannel}>
      {Icon && <Icon className="sidebarSelect_icon" />}
      {Icon ? (
        <h3>{title}</h3>
        ): (
        <h3 className='sidebarSelect_channel'>
          <span className="sidebarSelect_hash">#</span> {title}</h3>)}

    </div>
  );
}
