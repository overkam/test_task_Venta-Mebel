import "./FilledButton.css";
import arrow_unactive from "../../icons/arrow_unactive.svg";
import arrow_hover from "../../icons/arrow_hover.svg";
import { useSelector } from "react-redux";

function FilledButton(props) {
  const appState = useSelector((state) => state)
  let isActive

  if (props.classType === 'recover') {
    isActive = appState.recoverEmail
  } else {
    isActive = appState.email&&appState.password
  }

  return (
    <button
      className={`${props.classType}__btn ${isActive ? "" : "disabled"} `}
    >
      <p
        className={`${props.classType}__btn-text ${isActive ? "" : "disabled"}`}
      >
        {props.text}
      </p>
      {props.arrow ? (
        <div className="arrow-wrapper">
          {isActive ? (
            <img src={arrow_hover} alt="" />
          ) : (
            <img src={arrow_unactive} alt="" />
          )}
        </div>
      ) : null}
    </button>
  );
}

export default FilledButton;
