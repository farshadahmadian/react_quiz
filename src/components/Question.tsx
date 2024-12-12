import useQuizContext from "../contexts/useQuizContext";
import Options from "./Options";

function Question() {
  const {
    state: { questions, questionIndex },
  } = useQuizContext();
  return (
    <div>
      <h4>{questions[questionIndex].question}</h4>
      <Options />
    </div>
  );
}

export default Question;
