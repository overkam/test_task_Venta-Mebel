import "../App.css";
import arrow_unactive from "../arrow_unactive.svg";
import arrow_hover from "../arrow_hover.svg";
import { useState } from "react";

function FilledButton(props) {
  const [arrowHover, setArrowHover] = useState(false);

  return (
    <button
      className={`${props.classType}__btn`}
      onMouseOver={() => props.arrow && setArrowHover(true)}
      onMouseLeave={() => props.arrow && setArrowHover(false)}
    >
      <p
        className={`${props.classType}__btn-text`}
        onMouseOver={() => props.arrow && setArrowHover(true)}
        onMouseLeave={() => props.arrow && setArrowHover(true)}
      >
        {props.text}
      </p>
      {props.arrow ? (
        <div className='arrow-wrapper'>
          {arrowHover ? (
            <img src={arrow_hover} alt='' />
          ) : (
            <img src={arrow_unactive} alt='' />
          )}
        </div>
      ) : null}
    </button>
  );
}

export default FilledButton;
