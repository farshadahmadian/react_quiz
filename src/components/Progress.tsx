import useQuizContext from "../contexts/useQuizContext";

function Progress() {
  const {
    state: { score, answer, questionIndex },
    questionsNum,
    totalScore,
  } = useQuizContext();
  return (
    <header className="progress">
      <progress
        max={questionsNum}
        // value={answer !== null ? questionIndex + 1 : questionIndex}
        value={questionIndex + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{questionIndex + 1}</strong> / {questionsNum}
      </p>
      <p>
        <strong>{score}</strong>/ {totalScore}
      </p>
    </header>
  );
}

export default Progress;
