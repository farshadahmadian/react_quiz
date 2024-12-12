import { useContext } from "react";
import QuizContext from "./QuizContext";

function useQuizContext() {
  const quizContextValue = useContext(QuizContext);
  if (quizContextValue === undefined)
    throw new Error(
      "QuizContext is being used by a component that is not the context consumer"
    );
  return quizContextValue;
}

export default useQuizContext;
