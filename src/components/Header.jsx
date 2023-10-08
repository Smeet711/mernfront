import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
import { GrCart } from "react-icons/gr";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="ReactJs" /> ReactJs
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/about">About</NavLink>
        <div className="carticon">
          <GrCart />
        </div>

        <div className="logsignbtn">
          <button class="log navbtns">Login</button>
          {/* <button class="reg navbtns">Sign up</button> */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
