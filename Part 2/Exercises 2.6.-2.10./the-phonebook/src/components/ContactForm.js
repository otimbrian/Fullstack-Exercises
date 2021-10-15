import React from "react";
import Filter from "./Filter";


const ContactForm = (props) => {
    return(
        <form onSubmit={props.action}>
            <Filter infor={props.name} formVal={props.nameVal} handler={props.handler} />
            
            <Filter infor={props.contact} formVal={props.numberVal} handler={props.numHandler} />
            
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    )
}

export default ContactForm;