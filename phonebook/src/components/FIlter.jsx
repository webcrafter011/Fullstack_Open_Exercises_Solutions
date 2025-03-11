const Filter = ({ value, setFilter }) => {
  return (
    <>
      <div>
        Filter shown with:{" "}
        <input value={value} onChange={(e) => setFilter(e.target.value)} />
      </div>
    </>
  );
};

export default Filter;
