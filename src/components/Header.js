import React, { useState } from "react";
import logo from "../assets/Asset 16@4x.png";
import classes from "./Header.module.css";

export default function Header({ onOpenLayout }) {
  const [drawerOpen, setDawerOpen] = useState(false);

  function drawerToggleHandler() {
    setDawerOpen(!drawerOpen);
  }

  return (
    <header className={classes.mainHeader}>
      <nav className={classes.nav}>
        <div className={classes.logoDrawerContainer}>
          <img src={logo} alt="logo" className={classes.logo} />
          <div
            className={classes.drawerButton}
            onClick={drawerToggleHandler}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul className={`${classes.navUl} ${drawerOpen && classes.drawerOpen}`}>
          <li>
            <a href="/">HOME</a>
          </li>

          <li>ABOUT</li>

          <li>MENU</li>

          <li
            onClick={() => {
              onOpenLayout();
            }}
          >
            RESERVATIONS
          </li>

          <li>ORDER ONLINE</li>

          <li>LOGIN</li>

        </ul>
      </nav>
    </header>
  );
}
