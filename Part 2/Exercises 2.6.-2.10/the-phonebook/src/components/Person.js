import React from "react";
import Contact from "./Contact";

const Person = ({render, action}) => {
    return(
        <div>
                <ul>
                    {render.map(person => <Contact key={person.id} contact={person} action={()=> action(person.id)}/>   )}
                </ul>
            </div>
    )
}

export default Person;