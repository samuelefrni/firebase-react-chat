import React, { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, query, where, onSnapshot, orderBy } from "firebase/firestore"
import { database, auth } from '../config/firebase';
import ChatCSS from "../CSSModule/Chat.module.css"

const Chat = ({ room, setRoom }) => {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(database, "messages");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const queryMessage = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    )
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      let message = []
      snapshot.forEach((doc) => {
        message.push({
          ...doc.data(),
          id: doc.id
        })
      })
      setMessage(message);
    })

    return () => unsubscribe();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newMessage === "") return;
    try {
      await addDoc(messageRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        picture: auth.currentUser.photoURL,
        room: room
      })
    } catch (e) {
      console.error(e)
    }
    setNewMessage("")
  }

  const leaveTheRoom = () => {
    setRoom()
  }

  return (
    <>
      <div>
        <header className={ChatCSS.header}>
          <h1 className={ChatCSS.h1}>Welcome to: <span className={ChatCSS.span}>{room.toUpperCase()}</span></h1>
          <button className={ChatCSS.leaveRoom} onClick={leaveTheRoom}>Leave {room}</button>
        </header>
        <div className={ChatCSS.containerMessage}>
          {
            message.map((messages) => {
              return <div className={ChatCSS.messages} key={messages.id}>
                <img className={ChatCSS.profilePic} src={messages.picture} alt="" />
                <span className={ChatCSS.nameUser}>{messages.user}</span>
                <span className={ChatCSS.messageUser}>{messages.text}</span><br />
                <div className={ChatCSS.dateContainer}>
                  <span className={ChatCSS.hour}>{new Date(messages.createdAt?.toDate()).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</span><br/>
                  <span className={ChatCSS.date}>{new Date(messages.createdAt?.toDate()).toLocaleDateString()}</span>
                </div>
              </div>
            })
          }
        </div>
      </div>
      <form onSubmit={handleSubmit} className={ChatCSS.formContainer}>
        <input
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          className={ChatCSS.inputForm} />
        <button className={ChatCSS.buttonForm} type='submit'>Send</button>
      </form>
    </>
  )
}

export default Chat