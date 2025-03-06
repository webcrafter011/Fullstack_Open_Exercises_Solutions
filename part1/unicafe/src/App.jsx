import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h3>Give Feedback</h3>

      <div>
        <Button 
          increamentGood={() => setGood(good + 1)}
          increamentNeutral={() => setNeutral(neutral + 1)}
          increamentBad={() => setBad(bad + 1)}
        />
      </div>

      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  );
};

export default App;
