const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part part={part} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const totalParts = parts.reduce((sum, current) => sum + current.exercises, 0)

  return (
    <p>
      <b>Total of {totalParts} exercises</b>
    </p>
  )
}


const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course =>
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course
