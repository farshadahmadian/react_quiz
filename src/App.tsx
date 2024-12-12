import Main from "./components/Main";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StartMessage from "./components/StartMessage";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import useQuizContext from "./contexts/useQuizContext";

function App() {
  const {
    state: { status },
  } = useQuizContext();

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  return (
    <main className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartMessage />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <NextButton />
              <Timer />
            </Footer>
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </Main>
    </main>
  );
}

export default App;
