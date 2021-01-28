import logo from "../logo.svg";
import ellipse from "../ellipse.svg";
import "../App.css";
import { useSelector } from "react-redux";

function Header() {
  const isLogged = useSelector((state) => state.correctData);

  return (
    <div className={`header ${isLogged ? "logged" : ""} `}>
      {isLogged ? null : <img src={ellipse} alt='' />}
      <img src={logo} className="header__logo" alt='' />
      <div className="header__info">Корпоративная информационная система</div>
      <div className={`header__greeting ${isLogged ? "logged" : ""} `}>
        Добрый день, Владислав!
      </div>
      <div className={`header__loader ${isLogged ? "logged" : ""} `}>
        {" "}
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>{" "}
      </div>
    </div>
  );
}

export default Header;
