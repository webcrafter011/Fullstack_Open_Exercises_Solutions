import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, bad, neutral }) => {
  // constants
  const total = good + bad + neutral;
  const average = total == 0 ? 0 : ((good * 1 + bad * -1) / total).toFixed(2);
  const positive = total == 0 ? 0 : (good / total).toFixed(2);

  return (
    <>
      {/* this condition to avoid NaN initially (since we are deviding with zero the resultant becomes NaN) */}
      {good === 0 && bad === 0 && neutral === 0 ? (
        <>
          <p>No Feedback Given</p>
        </>
      ) : (
        <>
          <h3>Statistics</h3>
          <table>
            <tbody>
              <StatisticsLine text={"good"} value={good} />
              <StatisticsLine text={"neutral"} value={neutral} />
              <StatisticsLine text={"bad"} value={bad} />
              <StatisticsLine text={"all"} value={total} />
              <StatisticsLine text={"average"} value={average} />
              <StatisticsLine text={"positive"} value={`${positive * 100}%`} />
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Statistics;
