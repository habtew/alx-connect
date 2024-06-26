import React from 'react';
import "./Login.css";
import { Button } from '@mui/material';
import { auth, provider } from '../../firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from "./Reducer";


export default function Login() {
    const [state, dispatch] =useStateValue();
    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => {
            console.log(result);
            dispatch (
                {type: actionTypes.SET_USER,
                    user: result.user,

                }
            )

        })
        .catch((error) => {
            alert(error.message);
        }

        )
    } 
  return (
    <div className='login'>
        <div className='login_container'>
            <img
            src="/ALXconnect.png" alt="" />
            <h1> Sign in to ALXconnect</h1>
            <p>ALXconnect</p>
            <Button onClick={signIn}>Sign in with Google</Button>

        </div>

    </div>
  )
}
