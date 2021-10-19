import React from "react";
import Button from "./Button";

const Contact = ({contact, action}) => {
    return(
        <li>{contact.name} : {contact.number}<Button label='Delete' action={action}/></li>
    )
}


export default Contact;
