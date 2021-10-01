import React from "react";

const Header = (props) => {
  return(
    <div><h1>{props.head}</h1></div>
  )
}

const Content = (props) => {
  return(
    <div>
      <h1>{props.part} {props.exercise}</h1>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
    <p>Number of exercises {props.first + props.second + props.third}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return(
    <div>
      <Header head={course.name} />
      <Content part={course.parts[0].name} exercise={course.parts[0].exercises} />
      <Content part={course.parts[1].name} exercise={course.parts[1].exercises} />
      <Content part={course.parts[2].name} exercise={course.parts[2].exercises} />
      <Total first={course.parts[0].exercises} second={course.parts[1].exercises} third={course.parts[2].exercises} />
    </div>
  )
}

export default App;