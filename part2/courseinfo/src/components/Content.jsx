import Part from "./Part";

const Content = ({parts}) => {
  return (
    <>
      {parts.map(({ name, exercises, id }) => (
        <Part key={id} part={name} exercises={exercises} />
      ))}
    </>
  );
};

export default Content;
