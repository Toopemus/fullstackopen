import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const sum = () => good + neutral + bad
  const average = () => (good * 1 + neutral * 0 + bad * -1) / sum()
  const positive = () => good / sum() * 100

  if (good || neutral || bad) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={sum()} />
          <StatisticsLine text="average" value={average()} />
          <StatisticsLine text="positive" value={positive() + " %"} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const Button = ({text, buttonHandler}) => {
  return (
    <button onClick={buttonHandler}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button buttonHandler={() => setGood(good + 1)} text={"good"} />
      <Button buttonHandler={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button buttonHandler={() => setBad(bad + 1)} text={"bad"} />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
