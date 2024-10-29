import { QuestionType, ActionType } from '../App';
import Options from './Options';

type QuestionPropsType = {
  question: QuestionType;
  dispatch: React.Dispatch<ActionType>;
  answer: number | null;
};

function Question({ question, dispatch, answer }: QuestionPropsType) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
