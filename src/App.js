import "./App.css";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import ForgetForm from "./components/ForgetForm/ForgetForm";
import { useSelector } from "react-redux";

function App() {

  const isMove = useSelector(state => state.isMoveLogin)
  const isLogged = useSelector(state => state.correctData)

  return (
    <div className="background">
      <div className={`app-wrapper ${isMove ? 'move' : ''} ${isLogged ? 'logged' : ''}`}>
        <Header />
        <LoginForm />
        <ForgetForm />
      </div>
    </div>
  );
}

export default App;
