import Part from "./Part";

const Content = ({parts}) => {
  return (
    <>
      {parts.map(({ name, exercises }) => (
        <Part key={name} part={name} exercises={exercises} />
      ))}
    </>
  );
};

export default Content;
