import React from 'react'

const Button =({label, action})=>{
    return(
        <button onClick={action}>{label}</button>
    )
}


export default Button;