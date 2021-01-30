import "./LoginForm.css";
import TextField from "../TextField/TextField";
import Title from "../Title/Title";
import EmptyButton from "../EmptyButton/EmptyButton";
import FilledButton from "../FilledButton/FilledButton";
import { useDispatch, useSelector } from "react-redux";
import { loginCheckCreator, moveLoginCreator } from "../../redux/reducer";


function LoginForm() {
  const isMove = useSelector(state => state.isMoveLogin)

  const dispatch = useDispatch();

  const onLoginHandler = (e) => {
    e.preventDefault();

    if (e.nativeEvent.submitter.className.trim() === "login__btn") {
      if (e.target[0].value.trim() && e.target[2].value.trim()) {
        dispatch(
          loginCheckCreator([
            e.target[0].value.trim(),
            e.target[2].value.trim(),
          ])
        );
      }
    } else if (e.nativeEvent.submitter.className.trim() === "forget-pas__btn") {
      dispatch(moveLoginCreator())
    }
  };


  return (
      <form className={`form ${isMove ? 'move' : ''}`} onSubmit={onLoginHandler}>
        <Title message="Данные для входа" />
        <TextField
          type="text"
          placeholder="e-mail@mail.ru"
          title="Логин*"
          classType="login"
          textType="email"
        />
        <TextField
          type="password"
          placeholder=""
          title="Пароль*"
          classType="password"
          textType="text"
        />
        <div className='login__bottom-line'></div>
        <EmptyButton
          classType="forget-pas"
          text="Не помню пароль"
          type="submit"
        />
        <FilledButton
          classType="login"
          arrow={true}
          text="Войти в систему"
          type="submit"
        />
      </form>
  );
}

export default LoginForm;
