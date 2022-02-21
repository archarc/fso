import { useState } from 'react'

const Display = (props) => {
  return (
  <div>
    <h2>
      {props.title}
    </h2>
  </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.click}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good}/>
        <StatisticLine text="Neutral" value={props.neutral}/>
        <StatisticLine text="Bad" value={props.bad}/>
        <StatisticLine text="All" value={props.all}/>
        <StatisticLine text="Average" value={props.avg}/>
        <StatisticLine text="Positive" value={props.pos}/>
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const avg = ((good-bad) / all).toFixed(1)
  const pos = (good / all * 100).toFixed(1).toString() + "%"
  return (
    <div>
      <Display title="Give Feedback"/>
      <Button click={()=>{setGood(good + 1)}} text="Good"/>
      <Button click={()=>{setNeutral(neutral + 1)}} text="Neutral"/>
      <Button click={()=>{setBad(bad + 1)}} text="Bad"/>
      <Display title="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos}/>
    </div>
  )
}

export default App