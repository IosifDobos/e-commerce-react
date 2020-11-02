import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
//assets
import logo from '../assets/logo.svg'

//components
import CartLink from './Cart/CartLink';
import LoginLink from '../components/LoginLink';

export default function Header() {
  const { user } = useContext(UserContext);
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
            {user.token && (
              <li>
                <Link to="/checkout">checkout</Link>
              </li>
            )}
          </div>
          <div className="">
            <LoginLink />
            <CartLink />
          </div>
        </ul>
      </nav>
    </header>
  )
}
