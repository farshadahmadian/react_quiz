import useQuizContext from "../contexts/useQuizContext";

type OptionPropsType = {
  i: number;
  option: string;
};

function Option({ i, option }: OptionPropsType) {
  const {
    state: { answer, questionIndex, questions },
    dispatch,
  } = useQuizContext();

  const question = questions[questionIndex];

  return (
    <button
      className={`btn btn-option ${answer === i ? "answer" : ""} ${
        answer === null
          ? ""
          : answer === question.correctOption && answer === i
          ? "correct"
          : answer !== question.correctOption && answer === i
          ? "wrong"
          : answer !== question.correctOption && question.correctOption === i
          ? "correct"
          : ""
      }`}
      disabled={answer !== null}
      onClick={() => {
        dispatch({
          type: "answerReceived",
          payload: {
            answer: i,
            score: question.points,
          },
        });
      }}
    >
      {option}
    </button>
  );
}

export default Option;
