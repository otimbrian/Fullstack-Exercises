import React from "react";

const Course = ({couses}) => {
   /* const calculateTotal = (course) => {
        return(
            course.parts.reduce(function (sum, part) {
                            return (sum + part.exercises);
                        }, 0)
        )
    }*/
    return(
    couses.map(
        (course) => {
            return(
                <div>
                    <h1>{course.name}</h1>
                    <div>
                        {
                            course.parts.map(
                                function content(part){
                                    return(
                                        <li key={part.id}>{part.name} : {part.exercises}</li>
                                    )
                                }
                            )
                        }
                    </div>
                    <h5>Total of {
                        course.parts.reduce(function (sum, part) {
                            return (sum + part.exercises);
                        }, 0)
                    } Exercises</h5> 
                </div>
            )
        }
    )
    )
}

export default Course;