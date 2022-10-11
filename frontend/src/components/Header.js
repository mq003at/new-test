import { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate, parsePath } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "../css/Header.css";

function Header({ sidebar, setSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [pathArr, setPathArr] = useState([]);

  function goTo(data) {
    const path = "/" + pathArr.slice(0, pathArr.indexOf(data) + 1).join("/");
    navigate(path);
  }

  useEffect(() => {
    let getPath = location.pathname.split("/");
    getPath.shift();
    setPathArr(() => getPath);
  }, [location]);
  return (
    <header>
      <span align="left" id="show-path">
        {pathArr[0] ? (
          <div key={"header" + pathArr[0]}>
            <div className="header">{">>"}</div>
            <label className="header" onClick={() => goTo(pathArr[0])}>
              {pathArr[0].toUpperCase()}
            </label>
          </div>
        ) : (
          <div className="header" key={"header-frontpage"}>
            {">>"}
          </div>
        )}
      </span>
    </header>
  );
}
export default Header;
