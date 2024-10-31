import { ActionType } from '../App';

type NextButtonPropsType = {
  dispatch: React.Dispatch<ActionType>;
  answer: number | null;
};

function NextButton({ dispatch, answer }: NextButtonPropsType) {
  if (answer === null) return null;
  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      NextButton
    </button>
  );
}

export default NextButton;
