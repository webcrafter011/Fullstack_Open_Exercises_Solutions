const Filter = ({ value, setFilter }) => {
  return (
    <>
      <div>
        Filter shown with:{" "}
        <input value={value} onChange={setFilter} />
      </div>
    </>
  );
};

export default Filter;
