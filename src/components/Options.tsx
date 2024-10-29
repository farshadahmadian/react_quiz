import { QuestionType, ActionType } from '../App';
import Option from './Option';

export type OptionsPropsType = {
  question: QuestionType;
  dispatch: React.Dispatch<ActionType>;
  answer: number | null;
};

function Options({ question, dispatch, answer }: OptionsPropsType) {
  return (
    <div className='options'>
      {question.options.map((option, i) => (
        <Option
          key={option}
          question={question}
          dispatch={dispatch}
          answer={answer}
          i={i}
          option={option}
        />
      ))}
    </div>
  );
}

export default Options;
