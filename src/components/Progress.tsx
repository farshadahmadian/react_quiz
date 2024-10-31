type ProgressPropsType = {
  questionIndex: number;
  score: number;
  questionsNum: number;
  totalScore: number;
  answer: number | null;
};

function Progress({
  questionIndex,
  score,
  questionsNum,
  totalScore,
  answer,
}: ProgressPropsType) {
  return (
    <header className='progress'>
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
