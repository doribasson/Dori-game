import { useState, useEffect, useRef, forwardRef } from "react";
import Modal from "./modal/Modal";
import { Button } from "react-bootstrap";
import { useSessionStorage } from "../useHooks/useSessionStorage";
import Myform from "./myform/Myform";
import Loader from "./loader/loader";
import { fetchData } from "../action";

//global
let page = 1;

function App() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [clickHint, setClickHint] = useState(0);
  const [toggleHint, setToggleHint] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const myFormRef = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [sessionStorage, setSessionStorage] = useSessionStorage("detalis", {
    points: 0,
    mistakes: 0,
    hints: 0
  });

  useEffect(() => {
    getData(page);
  }, []);

  const getData = async page => {
    setLoading(true);
    const res = await fetchData(page);
    setLoading(false);
    setData(res);
  };

  const check = (e, i) => {
    const newData = [...data];
    newData[index].maskedName[i] = e.target.value.toLowerCase();
    setData(newData);

    if (mistakes > 2) {
      resetGame();
      setShow(false);
    }
  };

  const resetGame = () => {
    setIndex(0);
    page = 1;
    getData(page);
    setMistakes(0);
    setPoints(0);
    myFormRef.current.reset();
  };

  const nextCell = () => {
    const size = data.length - 1;
    if (page > data.total_pages) {
      alert("The end of result");
    }
    if (index === size) {
      page++;
      setIndex(0);
      getData(page);
    }
    setToggleHint(false);
    if (data[index].maskedName.join("") === data[index].originalName.join("")) {
      const newData = [...data];
      newData[index].isComplete = true;
      setData(newData);
      setPoints(prev => prev + 1);
      setSessionStorage(prev => ({
        ...prev,
        points: sessionStorage.points + 1
      }));
    } else {
      setMistakes(prev => prev + 1);
      setSessionStorage(prev => ({
        ...prev,
        mistakes: sessionStorage.mistakes + 1
      }));
    }
    setIndex(prev => prev + 1);
    myFormRef.current.reset();
  };

  const afterHint = () => {
    // setData(prev => [...prev, (prev[index].isHint = true)]);
    if (data[index].isHint === false) {
      setClickHint(prev => prev + 1);
      setSessionStorage(prev => ({
        ...prev,
        hints: sessionStorage.hints + 1
      }));
    }
    setToggleHint(!toggleHint);
    const newData = [...data];
    newData[index].isHint = true;
    setData(newData);
  };

  return (
    <div className="App_container">
      <div className="header_title">
        <div className="title">Guess the TV show name</div>
        <div className="modal_button">
          <Button
            className="btn btn-info statistics_Button"
            onClick={handleShow}
          >
            Statistics
          </Button>
        </div>
      </div>

      <br />
      {/* <span className="str_container"> {data[index]?.originalName}</span> */}

      <Myform data={data} check={check} index={index} myFormRef={myFormRef} />
      {loading ? (
        <span>
          <Loader />
        </span>
      ) : (
        <>
          <br />
          <Button className="btn btn-primary s" onClick={nextCell}>
            Guess
          </Button>
          <br />
          <Button className="btn btn-info" onClick={afterHint}>
            {!toggleHint ? "Get hint" : "Close hint"}
          </Button>
          {toggleHint ? (
            <span className="currentHint">{data[index]?.overview}</span>
          ) : null}
          <br />
          <p> points: {points}</p>
          <p> mistakes: {mistakes}</p>
          <p> clickHint: {clickHint}</p>

          <Modal
            title={"Statistics"}
            modalBody={{
              body1: "Your all point is: ",
              body2: "Your all mistakes is: ",
              body3: "Your all hints is: "
            }}
            modalData={{
              val1: sessionStorage.points,
              val2: sessionStorage.mistakes,
              val3: sessionStorage.hints
            }}
            show={show}
            onHide={handleClose}
          />
        </>
      )}
      {mistakes > 3 && (
        <div className="gameOver">
          <div>
            <div className="modal_button">
              <Button className="btn btn-info statics2" onClick={handleShow}>
                Statistics
              </Button>
            </div>
            Game Over
            <br />
            Your faild 3 times
            <span>
              <Button className="myb" onClick={resetGame}>
                Start new Game
              </Button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default forwardRef(App);
