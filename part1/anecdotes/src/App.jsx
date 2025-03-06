import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const generateRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const maxVotedAnecdote = () => {
    let maxVoted = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > votes[maxVoted]) {
        maxVoted = i;
      }
    }
    console.log(maxVoted)
    return maxVoted;
  };

  const increamentVote = (id) => {
    setVotes({
      ...votes,
      [id]: votes[id] + 1,
    });
  };

  return (
    <>
      <div>
        {`${selected}. ${anecdotes[selected]}`}
        <br />
        <div>Vote Count: {votes[selected]}</div>
        <button onClick={() => increamentVote(selected)}>Vote</button>
        <button onClick={generateRandomAnecdote}>
          Generate Random Anecdote
        </button>
      </div>
      <div>
        <h3>Anecdote with most votes</h3>
        <div>
          {anecdotes[maxVotedAnecdote()]}
        </div>
      </div>
    </>
  );
};

export default App;
