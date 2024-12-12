import {
  createContext,
  ReactNode,
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type StatusType = "loading" | "error" | "ready" | "active" | "finish";

interface IState {
  questions: QuestionType[];
  status: StatusType;
  questionIndex: number;
  answer: number | null;
  score: number;
  quizTime: number | null;
}

type PayloadType = Partial<IState>;

type ReducerActionType =
  | "dataReceived"
  | "dataFailed"
  | "start"
  | "answerReceived"
  | "nextQuestion"
  | "finishQuiz"
  | "restart"
  | "countDown";

export type ActionType = {
  type: ReducerActionType;
  payload?: PayloadType;
};

const initialState: IState = {
  questions: [],
  status: "loading",
  questionIndex: 0,
  answer: null,
  score: 0,
  quizTime: null,
};

const SEC_PER_QUESTION = 30;

function reducer(prevState: IState, action: ActionType): IState {
  const isNextQuestion =
    prevState.questionIndex < prevState.questions.length - 1;

  const { type, payload } = action;
  switch (type) {
    case "dataReceived":
      return {
        ...prevState,
        questions: payload?.questions ?? [],
        status: payload?.status ?? "error",
      };
    case "dataFailed":
      return { ...prevState, status: "error" };
    case "start":
      return {
        ...prevState,
        status: "active",
        quizTime: prevState.questions.length * SEC_PER_QUESTION,
      };
    case "answerReceived": {
      const question = prevState.questions[prevState.questionIndex];
      // const isAnswerCorrect = question.correctOption === prevState.answer; // prevState.answer is not updated yet and is a stale state. updating a state (state.score) based on another state (state.answer) is wrong if both states are being updated at the same time
      const isAnswerCorrect = question.correctOption === payload?.answer;
      return {
        ...prevState,
        answer: payload?.answer ?? null,
        score: isAnswerCorrect
          ? prevState.score + (payload?.score ?? 0)
          : prevState.score,
      };
    }
    case "nextQuestion": {
      if (!isNextQuestion) return prevState;
      return {
        ...prevState,
        questionIndex: isNextQuestion
          ? prevState.questionIndex + 1
          : prevState.questionIndex,
        answer: null,
      };
    }
    case "finishQuiz":
      return { ...prevState, status: "finish" };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: prevState.questions,
      };
    case "countDown":
      return {
        ...prevState,
        quizTime: prevState.quizTime ? prevState.quizTime - 1 : 0,
        status:
          prevState.quizTime && prevState.quizTime > 0 ? "active" : "finish",
      };
    default: {
      const exhaustiveCase: never = type;
      throw new Error(`Unhandled case: ${exhaustiveCase}`);
    }
  }
}

type DefaultQuizContextType = {
  state: IState;
  dispatch: React.Dispatch<ActionType>;
  questionsNum: number;
  totalScore: number;
  highScore: React.MutableRefObject<number>;
};

const defaultQuizContextValue: DefaultQuizContextType = {
  state: {
    questions: [],
    status: "loading",
    questionIndex: 0,
    answer: null,
    score: 0,
    quizTime: null,
  },
  dispatch: () => {},
  questionsNum: 0,
  totalScore: 0,
  highScore: { current: 0 },
};

const QuizContext = createContext(defaultQuizContextValue);

type QuizContextProviderPropsType = {
  children: ReactNode;
};

export function QuizContextProvider({
  children,
}: QuizContextProviderPropsType) {
  const [state, dispatch] = useReducer<Reducer<IState, ActionType>>(
    reducer,
    initialState
  );

  const highScore = useRef<number>(
    JSON.parse(localStorage.getItem("highScore") ?? "0")
  );

  const questionsNum = useMemo(() => {
    return state.questions.length;
  }, [state.questions.length]);

  const totalScore = useMemo(() => {
    const totalPoints = state.questions.reduce((accu, question) => {
      return accu + question.points;
    }, 0);

    return totalPoints;
  }, [state.questions]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:3001/questions");
        const data = await response.json();
        dispatch({
          type: "dataReceived",
          payload: { questions: data, status: "ready" },
        });
      } catch (error) {
        dispatch({ type: "dataFailed" });
        console.error(error);
      }
    }

    getData();
  }, [dispatch]);

  return (
    <QuizContext.Provider
      value={{ state, dispatch, questionsNum, totalScore, highScore }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizContext;
