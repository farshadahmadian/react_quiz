import { OptionsPropsType } from './Options';

type OptionPropsType = OptionsPropsType & {
  i: number;
  option: string;
};

function Option({ answer, question, dispatch, i, option }: OptionPropsType) {
  return (
    <button
      className={`btn btn-option ${answer === i ? 'answer' : ''} ${
        answer === null
          ? ''
          : answer === question.correctOption && answer === i
          ? 'correct'
          : answer !== question.correctOption && answer === i
          ? 'wrong'
          : answer !== question.correctOption && question.correctOption === i
          ? 'correct'
          : ''
      }`}
      disabled={answer !== null}
      onClick={() => {
        dispatch({
          type: 'answerReceived',
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
