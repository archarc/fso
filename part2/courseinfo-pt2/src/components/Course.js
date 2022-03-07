import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}



const Total = ({ parts }) => {
  const pt = parts.map(part => part.exercises)
  const sum = pt.reduce((acc, ele) => acc + ele)
  return (
  <>
    <p>Total number of exercises {sum}</p>
  </>
  )
}

const Part = ({ parts }) => {
  return (
    <div>
      {parts.map(part=> <p key={part.id}>{part.name} {part.exercises}</p>)}
    </div>
  )
}

const Content = ({ parts }) => 
  <>
  <Part parts={parts}/>
  </>

const Course = ({courses}) => {
  return (
    <div>
        <h1>Web development curriculum</h1>
        {courses.map(course =>
        <div key={course.id}>
          <Header course={course}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
        )}


    </div>
  )
}

export default Course