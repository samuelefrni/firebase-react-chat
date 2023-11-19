import React, { useState, useRef } from 'react'
import Login from './components/Login'
import Cookies from 'universal-cookie';
import RoomName from './components/RoomName';
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {
  const cookie = new Cookies();
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signOutUser = async () => {
    await signOut(auth)
    cookie.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {
    return (
      <React.Fragment>
        <Login setIsAuth={setIsAuth} />
      </React.Fragment>
    )
  }

  return (
  <div>
    {room ? <Chat room={room} setRoom={setRoom} /> : <RoomName setRoom={setRoom} roomInputRef={roomInputRef} signOutUser={signOutUser}/>}
  </div>
  )

}

export default App
