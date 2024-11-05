import { ActionType } from '../App';

type NextButtonPropsType = {
  questionIndex: number;
  questionsNum: number;
  dispatch: React.Dispatch<ActionType>;
  answer: number | null;
  highScore: React.MutableRefObject<number>;
  score: number;
};

function NextButton({
  dispatch,
  answer,
  questionsNum,
  questionIndex,
  highScore,
  score,
}: NextButtonPropsType) {
  if (answer === null) return null;

  if (questionIndex < questionsNum - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );
  else {
    if (score > highScore.current) {
      highScore.current = score;
      localStorage.setItem('highScore', JSON.stringify(highScore.current));
    }

    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finishQuiz' })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
