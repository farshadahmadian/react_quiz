import { useEffect } from "react";
import useQuizContext from "../contexts/useQuizContext";

function Timer() {
  const {
    state: { quizTime },
    dispatch,
  } = useQuizContext();
  useEffect(() => {
    // in React StrictMode, the component gets mounted, unmounted and again mounted. If the clean up callback function does not remove the interval callback function, then two interval callback functions are registered in the event loop and both of them will be called each second. Also, when the component gets unmounted, e.g. the timer reaches to zero, if we restart the quiz, the component gets mounted again and another timer, or actually two more timers in case of StrictMode, will be set
    const id = setInterval(() => {
      dispatch({ type: "countDown" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  if (!quizTime) return;
  const minute = Math.floor(quizTime / 60);
  const second = quizTime % 60;

  return (
    <div className="timer">
      <span className="minute">{minute >= 10 ? minute : `0${minute}`}</span>:
      <span className="second">{second >= 10 ? second : `0${second}`}</span>
    </div>
  );
}

export default Timer;
