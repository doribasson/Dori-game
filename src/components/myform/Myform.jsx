const Myform = ({ data, check, index, myFormRef }) => {
  return (
    <form ref={myFormRef}>
      {data[index]?.maskedName.map((el, i) => {
        if (data[index].fakeName[i] === "_")
          return (
            <input
              className="emptyCard"
              key={i}
              onKeyUp={e => check(e, i)}
              required
              style={{ width: "1em" }}
              maxLength="1"
              type="text"
            />
          );
        else
          return (
            <span className="noneEmptyCard" key={i}>
              {el}
            </span>
          );
      })}
    </form>
  );
};

export default Myform;
