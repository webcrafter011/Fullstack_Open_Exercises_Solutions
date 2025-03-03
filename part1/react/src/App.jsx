import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  const exercises = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total exercises={exercises} />
    </div>
  )
}

export default App