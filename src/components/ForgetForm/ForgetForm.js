import "./ForgetForm.css";
import TextField from "../TextField/TextField";
import Title from "../Title/Title";
import EmptyButton from "../EmptyButton/EmptyButton";
import FilledButton from "../FilledButton/FilledButton";
import warning from "../../icons/warning.svg";
import { useDispatch, useSelector } from "react-redux";
import { moveLoginCreator } from "../../redux/reducer";

function ForgetForm() {

  const dispatch = useDispatch();

  const isMove = useSelector(state => state.isMoveLogin)

  const onBtnCLick = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.className === "back__btn") {
      dispatch(moveLoginCreator())
    }
  };

  return (
      <form className={`forget__form ${isMove ? 'move' : ''}`} onSubmit={onBtnCLick}>
        <Title message="Восстановление пароля" />
        <TextField
          type="text"
          placeholder="e-mail@mail.ru"
          title="Логин или e-mail*"
          classType="login"
          textType="email"
          isForget={true}
        />
        <img className="warning" src={warning} alt='' />
        <div className="warning__message">
          Пароль будет отправлен на электронную почту, к которой привязана
          учетная запись.
        </div>
        <div className='forget__bottom-line'></div>
        <EmptyButton classType="back" text="Назад" type="submit" />
        <FilledButton
          classType="recover"
          arrow={false}
          text="Восстановить"
          type="submit"
        />
      </form>
  );
}

export default ForgetForm;