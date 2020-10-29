import React from "react";
import { Link } from 'react-router-dom';

//assets
import logo from '../assets/logo.svg'

export default function Header() {

  return (
    <header className="header">
      <img src={logo} className="logo" alt="Vintage Texh" />
      <nav>
        <ul>
          <div className="">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </div>
          <div className="">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  )
}
