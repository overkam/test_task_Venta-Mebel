import { useState } from "react";
import "../App.css";
import cross from "../cross.svg";
import red_cross from "../red_cross.svg";
import check from "../check.svg";
import { useDispatch, useSelector } from "react-redux";
import { retryCreator } from "../redux/reducer";

function TextField(props) {
  let imageSrc = cross
  const [show, setShow] = useState(false);
  const [itemClass, setItemClass] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const appState = useSelector((state) => state);

  if (appState.invalidEmail && props.type === "text") {
    setErrorClass("invalid");
    setErrorMessage("Введите корректный e-mail");
    dispatch(retryCreator());
  }
  if (appState.wrongData && props.type === "text") {
    setErrorClass("invalid");
    setErrorMessage("Неверный e-mail или пароль");
    dispatch(retryCreator());
  }
  if (appState.invalidPassword && props.type === "password") {
    setErrorClass("invalid");
    setErrorMessage("Пароль должен составлять не менее 8 символов");
    dispatch(retryCreator());
  }

  const onItemClick = () => {
    setItemClass("-clicked");
    setShow(true);
  };

  const onInputClear = () => {
    setInputValue("");
    setErrorClass("");
    setErrorMessage("");
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  if (itemClass&&appState.isMoveLogin&&!props.isForget) {
    setErrorClass("");
    setInputValue("");
    setErrorMessage("");
    setItemClass("");
    setShow(false);
  }

  if(itemClass&&!appState.isMoveLogin&&props.isForget) {
    setInputValue("");
    setItemClass("");
    setShow(false);
  }

  if(appState.correctData) {
    imageSrc = check
  }

  return (
    <div>
      <div
        className={`form__${props.classType}${itemClass} ${errorClass} `}
        onClick={onItemClick}
      >
        <div className={`form__${props.classType}-label${itemClass}`}>
          {props.title}
        </div>
        {show ? (
          <input
            className={`form__${props.classType}-${props.textType}`}
            placeholder={props.placeholder}
            type={props.type}
            value={inputValue}
            onChange={onInputChange}
          />
        ) : null}
        {inputValue ? (
          <button className="clear__btn" onClick={onInputClear}>
            {errorClass ? <img src={red_cross} alt='' /> : <img src={imageSrc} alt='' />}
          </button>
        ) : null}
        {errorMessage ? (
          <div className="form__error-message">{errorMessage}</div>
        ) : null}
      </div>
    </div>
  );
}

export default TextField;
