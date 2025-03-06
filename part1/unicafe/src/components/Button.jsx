const Button = ({increamentGood, increamentBad, increamentNeutral}) => {
    return (
        <>
        <button onClick={increamentGood}>Good</button>
        <button onClick={increamentBad}>Neutral</button>
        <button onClick={increamentNeutral}>Bad</button>
        </>
    )
}

export default Button;