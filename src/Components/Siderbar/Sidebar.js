import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import SidebarSelect from './SidebarSelect';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import db  from '../../firebase'; 
import { useStateValue } from './StateProvider';


export default function Sidebar() {
  const [Channels, setChannels] = useState([])
  const [{ user }] = useStateValue();

  useEffect(() => {
    //This code runs when the sidebar component loads
    db.collection('rooms').onSnapshot(snapshot => (
      setChannels(
        snapshot.docs.map(doc=> ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    ))
  }, [])


  return (
    <div className="sidebar">
      <div className='sidebar_header'>
        <div className='sidebar_info'>
        <h2>ALX Connect</h2>
        <h3>
          <FiberManualRecordIcon />
          {user?.displayName}

          {/*Josy Dassah */}
        </h3>

        </div>
        <CreateTwoToneIcon />       
        
      </div>
      {/*<SidebarSelect Icon={InsertCommentIcon} title="Threads" />
      <SidebarSelect Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarSelect Icon={DraftsIcon} title="Saved Items" />
      <SidebarSelect Icon={BookmarkBorderIcon} title="Channel Browser" />
      <SidebarSelect Icon={PeopleAltIcon} title="People & User Groups" />
      <SidebarSelect Icon={AppsIcon} title="Apps" />
      <SidebarSelect Icon={FileCopyIcon} title="File Browser" />
      <SidebarSelect Icon={ExpandLessIcon} title="Show Less" /> */}
      <hr />

      <SidebarSelect Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      
      <SidebarSelect Icon={AddIcon} addChannelOption title="Create Channel" />

      {/* Connect to db and list all the channels */}
      { /* <sidebarSelect  /> */}
      {Channels.map((channel) => (
        <SidebarSelect title={channel.name} id={channel.id} key={channel.id} />
      ))}
      <SidebarSelect title="Announcements" />
      <SidebarSelect title="Cohort-16" />
      <SidebarSelect title="Youtube" />
      <SidebarSelect title="Facebook" />
      



    </div>
  )
}

