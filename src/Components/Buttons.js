import styles from "./Button.module.css";
import { useSelector, useDispatch } from "react-redux";
import { timeActions } from "../redux/TimeSlice";
import { useRef } from "react";

const Buttons = () => {
  const isStarted = useSelector((state) => state.timeReducer.isStarted);
  const isStopped = useSelector((state) => state.timeReducer.isStopped);
  const dispatch = useDispatch();
  const timerRef = useRef();

  const countingFunction = (type) => {
    const oldDate = new Date();
    timerRef.current = setInterval(() => {
      const newDate = new Date();
      if (type === "start") {
        dispatch(timeActions.start(newDate - oldDate));
      }
      if (type == "resume") {
        dispatch(timeActions.resume(newDate - oldDate));
      }
    }, 0);
  };

  const stopHandler = () => {
    clearInterval(timerRef.current);
    dispatch(timeActions.stop());
  };

  const resetHandler = () => {
    dispatch(timeActions.reset());
  };

  const lapHandler = () => {
    dispatch(timeActions.lap());
  };

  const showingButtons = () => {
    if (!isStarted && !isStopped) {
      return (
        <>
          <button className={styles.disabledButton} disabled>
            Lap
          </button>
          <button
            className={styles.startButton}
            onClick={() => countingFunction("start")}
          >
            Start
          </button>
        </>
      );
    }
    if (isStarted && !isStopped) {
      return (
        <>
          <button className={styles.lapAndResetButton} onClick={lapHandler}>
            Lap
          </button>
          <button className={styles.stopButton} onClick={stopHandler}>
            Stop
          </button>
        </>
      );
    }
    if (isStarted && isStopped) {
      return (
        <>
          <button className={styles.lapAndResetButton} onClick={resetHandler}>
            Reset
          </button>
          <button
            className={styles.resumeButton}
            onClick={() => countingFunction("resume")}
          >
            Resume
          </button>
        </>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonDiv}>{showingButtons()}</div>
    </div>
  );
};

export default Buttons;
