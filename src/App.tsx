import { Reducer, useEffect, useReducer } from 'react';
import Main from './components/Main';
import Header from './components/Header';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import StartMessage from './components/StartMessage';
import Question from './components/Question';

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type StatusType = 'loading' | 'error' | 'ready' | 'active' | 'finish';

interface IState {
  questions: QuestionType[];
  status: StatusType;
  questionIndex: number;
  answer: number | null;
  score: number;
}

type PayloadType = Partial<IState>;

type ReducerActionType =
  | 'dataReceived'
  | 'dataFailed'
  | 'start'
  | 'answerReceived';

export type ActionType = {
  type: ReducerActionType;
  payload?: PayloadType;
};

function reducer(prevState: IState, action: ActionType): IState {
  const { type, payload } = action;
  switch (type) {
    case 'dataReceived':
      return {
        ...prevState,
        questions: payload?.questions ?? [],
        status: payload?.status ?? 'error',
      };
    case 'dataFailed':
      return { ...prevState, status: 'error' };
    case 'start':
      return { ...prevState, status: 'active' };
    case 'answerReceived': {
      const question = prevState.questions[prevState.questionIndex];
      // const isAnswerCorrect = question.correctOption === prevState.answer; // prevState.answer is not updated yet and is a stale state. updating a state (state.score) based on another state (state.answer) is wrong if both states are being updated at the same time
      const isAnswerCorrect = question.correctOption === payload?.answer;
      console.log(isAnswerCorrect);
      return {
        ...prevState,
        answer: payload?.answer ?? null,
        score: isAnswerCorrect
          ? prevState.score + (payload?.score ?? 0)
          : prevState.score,
      };
    }
    default: {
      const exhaustiveCase: ReducerActionType = type;
      throw new Error(`Unhandled case: ${exhaustiveCase}`);
    }
  }
}

const initialState: IState = {
  questions: [],
  status: 'loading',
  questionIndex: 0,
  answer: null,
  score: 0,
};

function App() {
  const [state, dispatch] = useReducer<Reducer<IState, ActionType>>(
    reducer,
    initialState
  );

  const { questions, status, questionIndex, answer, score } = state;
  const questionsNum = questions.length;

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://localhost:3001/questions');
        const data = await response.json();
        dispatch({
          type: 'dataReceived',
          payload: { questions: data, status: 'ready' },
        });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
        console.error(error);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <main className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorMessage />}
        {status === 'ready' && (
          <StartMessage questionsNum={questionsNum} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <Question
            question={questions[questionIndex]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
        <h2>{score}</h2>
      </Main>
    </main>
  );
}

export default App;
