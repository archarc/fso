const Header = (props) => {
  return (
    <>
      <h1>
        {props.course}      
      </h1>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <h2>
        {props.part}
      </h2>
      <p>
        Number of exercises: {props.exercise}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <h3>
        Total number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}      
      </h3>
    </>
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

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App