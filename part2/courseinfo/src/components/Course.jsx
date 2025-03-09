import Header from "./Header";
import Content from "./Content";
import Total from "./Total"

const Course = ({name, parts}) => {
    
    return(
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    )
}

export default Course;