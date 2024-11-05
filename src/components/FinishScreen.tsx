import { ActionType } from '../App';

type FinishScreenPropsType = {
  score: number;
  totalScore: number;
  highScore: React.MutableRefObject<number>;
  dispatch: React.Dispatch<ActionType>;
};

function FinishScreen({
  score,
  totalScore,
  highScore,
  dispatch,
}: FinishScreenPropsType) {
  const scorePercent = Math.round((score / totalScore) * 100);

  let emoji = '';
  switch (true) {
    case scorePercent < 50:
      emoji = '🥴';
      break;
    case scorePercent >= 50 && scorePercent < 70:
      emoji = '🙁';
      break;
    case scorePercent > 70 && scorePercent < 90:
      emoji = '🙂';
      break;
    case scorePercent > 90:
      emoji = '😃';
      break;
    default:
      emoji = '';
      break;
  }

  return (
    <>
      <p className='result'>
        You scored <strong>{score}</strong> out of {totalScore} ({scorePercent}
        )%
        <span>{emoji}</span>
      </p>
      <p className='highscore'>(High Score: {highScore.current} Points)</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
