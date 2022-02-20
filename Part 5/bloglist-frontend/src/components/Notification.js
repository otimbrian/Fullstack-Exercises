import React from "react"

const Notification = ({ message, status }) => {

    if(message === null){
        return null
    }
    return(
        <div>
            <h2 className={status}>{message}</h2>
        </div>
    )
}

export default Notification