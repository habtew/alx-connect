import React from 'react'
import './Header.css';
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useStateValue } from '../Siderbar/StateProvider';

export default function Header() {
  const [{ user }] =useStateValue();
  return (
    <div className="header">
        <div className='header_left'>
  {/* Avatars for logged in user */}
    <Avatar 
        className="header_avatar"
        alt={user?.displayName}
        src={user?.photoURL}
        /*alt='Josephine Dassah'
        src='' */
    />
    <AccessTimeIcon />
  {/* Time icon */}          
        </div>
        <div className="header_search">
        {/*Search icon */}
        <SearchIcon />
        {/* input */}
        <input placeholder='Search Claver Programmer'/>
        </div>
        <div className="header_right">
            {/* Help icon */}
            <HelpOutlineIcon />
        </div>
    </div>
  )
}
