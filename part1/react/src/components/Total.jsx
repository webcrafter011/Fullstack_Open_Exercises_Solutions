const Total = ({ exercises }) => {
  const totalExercises = exercises.reduce((accumulator, currentVal) => {
    return accumulator + currentVal;
  }, 0);

  return (
    <>
      <p>Number of exercises {totalExercises}</p>
    </>
  );
};

export default Total;
