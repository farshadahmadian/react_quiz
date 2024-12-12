import useQuizContext from "../contexts/useQuizContext";

function NextButton() {
  const {
    state: { answer, questionIndex, score },
    dispatch,
    questionsNum,
    highScore,
  } = useQuizContext();
  if (answer === null) return null;

  if (questionIndex < questionsNum - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  else {
    if (score > highScore.current) {
      highScore.current = score;
      localStorage.setItem("highScore", JSON.stringify(highScore.current));
    }

    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
