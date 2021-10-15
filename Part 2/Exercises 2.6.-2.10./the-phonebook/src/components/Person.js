import React from "react";
import Contact from "./Contact";

const Person = ({render}) => {
    return(
        <div>
                <ul>
                    {render.map(person => <Contact key={person.id} contact={person}/>   )}
                </ul>
            </div>
    )
}

export default Person;