import { useEffect, useState } from "react";
import "./TextField.css";
import cross from "../../icons/cross.svg";
import red_cross from "../../icons/red_cross.svg";
import check from "../../icons/check.svg";
import { useDispatch, useSelector } from "react-redux";
import { retryCreator, setValidationCreator } from "../../redux/reducer";

function TextField(props) {

  const [imageSrc, setImageSrc] = useState(cross);
  const [show, setShow] = useState(false);
  const [itemClass, setItemClass] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const REG_EXP1 = /^[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
  const REG_EXP2 = /^[0-9a-z_-]+\.[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;

  const dispatch = useDispatch();

  const appState = useSelector((state) => state);

  useEffect(() => {
    if (appState.email) {
      dispatch(setValidationCreator("email"));
    }
    if (appState.password) {
      dispatch(setValidationCreator("password"));
    }
    if (appState.recoverEmail) {
      dispatch(setValidationCreator("recoverEmail"));
    }
  }, [appState.isMoveLogin]);

  if (appState.wrongData && props.type === "text") {
    setErrorClass("invalid");
    setErrorMessage("Неверный e-mail или пароль");
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

  if (
    (itemClass && appState.isMoveLogin && !props.isForget) ||
    (itemClass && !appState.isMoveLogin && props.isForget)
  ) {
    setErrorClass("");
    setInputValue("");
    setErrorMessage("");
    setItemClass("");
    setShow(false);
    setImageSrc(cross);
  }

  const onValidationCheck = (e) => {
    if (e.target.className === "form__login-email") {
      if (!REG_EXP1.test(e.target.value) && !REG_EXP2.test(e.target.value)) {
        setErrorClass("invalid");
        setErrorMessage("Введите корректный e-mail");
      } else {
        setImageSrc(check);
        setErrorClass("");
        setErrorMessage("");
        setItemClass("-valid");
        if (e.target.form.className === "forget__form move") {
          dispatch(setValidationCreator("recoverEmail"));
        } else {
          dispatch(setValidationCreator("email"));
        }
      }
    } else if (e.target.className === "form__password-text") {
      if (e.target.value.length < 8) {
        setErrorClass("invalid");
        setErrorMessage("Пароль должен составлять не менее 8 символов");
      } else {
        setImageSrc(check);
        setErrorClass("");
        setErrorMessage("");
        setItemClass("-valid");
        dispatch(setValidationCreator("password"));
      }
    }
  };

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
            onBlur={onValidationCheck}
          />
        ) : null}
        {inputValue ? (
          <button className="clear__btn" onClick={onInputClear}>
            {errorClass ? (
              <img src={red_cross} alt="" />
            ) : (
              <img src={imageSrc} alt="" />
            )}
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
