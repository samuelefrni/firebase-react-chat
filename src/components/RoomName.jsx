import React from 'react'
import RoomNameCSS from "../CSSModule/RoomName.module.css"

const RoomName = ({ setRoom, roomInputRef, signOutUser }) => {

    return (
        <div className={RoomNameCSS.mainContainer}>
            <form onSubmit={(e) => e.preventDefault()} className={RoomNameCSS.form}>
                <label className={RoomNameCSS.label}>Which room do you want to enter?</label><br />
                <input className={RoomNameCSS.input} type="text" ref={roomInputRef} /><br />
                <div className={RoomNameCSS.buttonContainer}>
                    <button onClick={() => setRoom(roomInputRef.current.value.toUpperCase())}>Let's Chat!</button>
                    <button className={RoomNameCSS.buttonSignOut} onClick={signOutUser}>Sign Out</button>
                </div>
            </form>
        </div>
    )
}

export default RoomName