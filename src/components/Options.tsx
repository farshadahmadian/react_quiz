import useQuizContext from "../contexts/useQuizContext";
import Option from "./Option";

function Options() {
  const {
    state: { questions, questionIndex },
  } = useQuizContext();

  const question = questions[questionIndex];
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <Option key={option} i={i} option={option} />
      ))}
    </div>
  );
}

export default Options;
