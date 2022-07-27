import { useState, useImperativeHandle, forwardRef } from "react"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hide = {display : visible ? 'None': ''}
    const show = {display : visible ? '': 'None'}

    const changeVisibility = () => {
        setVisible(!visible)
    }


    useImperativeHandle(ref, ()=> {
        return{
            changeVisibility
        }     
    })

    return(
        <div>
            <div style={hide}>
                <button onClick={changeVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={show}>
                {props.children}
                <button onClick={changeVisibility}>Cancel</button>
            </div>
        </div>
    )
} )


export default Togglable